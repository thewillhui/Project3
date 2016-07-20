class SubscriptionsController < ApplicationController
  before_action :authenticate_user!
  def index
    @folders = current_user.subscriptions.pluck(:folder).uniq

    @subscriptions = []
    current_user.subscriptions.each do |user_subscription|
      subscription = user_subscription.attributes
      subscription[:entries] = []

      feed = Feedjira::Feed.fetch_and_parse user_subscription.url
      feed.entries.each do |entry|
        subscription[:entries].push({
          title: entry.title,
          summary: entry.summary,
          url: entry.url,
          entry_id: entry.entry_id,
          published: entry.published
        });
      end

      @subscriptions.push(subscription);
    end
  end

  def manage
    @folders = current_user.subscriptions.group_by {|x|x.folder}
    render json: @folders
  end

  def getFolders
    @folders = current_user.subscriptions.pluck(:folder).uniq
    render json: @folders
  end

  def add
    subscription = current_user.subscriptions.new(subscription_params)
    if !current_user.subscriptions.exists?(title: params[:subscription][:title]) && subscription.save
      render json: subscription
    else
      render json: subscription.errors.messages, status: 400
    end
  end

  def getSubscriptions
    @subscriptions = current_user.subscriptions
    render json: @subscriptions
  end

  # for testing purpose only
  def feed
    client = Feedlr::Client.new(oauth_access_token: ENV["FEEDLR_SECRET_KEY"])

    @entries = client.search_feeds('economist')
    render json: @entries
  end

  def entries
    url = 'http://www.economist.com/sections/international/rss.xml'
    @feed = Feedjira::Feed.fetch_and_parse url
    render json: @feed
  end

  def destroy
    user_subscription = Subscription.find(params[:id])
    destroyed = user_subscription.destroy
    if user_subscription.destroy
      render json: destroyed
    end
  end

private
  def folder_params
    params.require(:subscription).permit(:folder)
  end

  def subscription_params
    params.require(:subscription).permit(:title, :url, :folder, :logoUrl)
  end

end