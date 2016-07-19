class SubscriptionsController < ApplicationController
  def index
    @subscriptions = []
    db_subscriptions = current_user.subscriptions
    db_subscriptions.each do |db_subscription|

      feed = Feedjira::Feed.fetch_and_parse db_subscription.url
      datas = []
      feed.entries.each do |entry|
        data = {
          title: entry.title,
          summary: entry.summary,
          url: entry.url,
          entry_id: entry.entry_id,
          published: entry.published
        }
        datas.push(data);
      end

      subscription = {
        id: db_subscription.id,
        url: db_subscription.url,
        title: db_subscription.title,
        entries: datas
      }
      @subscriptions.push(subscription);
    end

    # url = 'http://www.economist.com/sections/international/rss.xml'
  end

  def add
    subscription = current_user.subscriptions.new(subscription_params)
    if subscription.save
      render json: subscription
    else
      render json: @post.errors.messages, status: 400
    end
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

private
  def subscription_params
    params.require(:subscription).permit(:title, :url)
  end

end