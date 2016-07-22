class BookmarkController < ApplicationController
  before_action :find_bookmark, only: [:create]
  def index
    @bookmarks = current_user.bookmarks
    render json: @bookmarks
  end

  def create
    # if @bookmark.exist?(link: params[:bookmark][:link])
    if !current_user.bookmarks.exists?(:link => params[:bookmark][:link])
      @bookmark = current_user.bookmarks.create(bookmark_params)
      if @bookmark.save
        render json: @bookmark
      else
        render json: @bookmark.errors.messages, status: 400
      end
    else
      current_user.bookmarks.find_by(link: params[:bookmark][:link]).destroy
      # bookmark.destroy

      render json: {destroyed: true}
    end
    # if bookmark.exist?(web_url: params[:bookmark][:web_url])
    # else
    #   render json: {message: "This bookmark has been added already"}
    # end
  end

  def destroy
    if Bookmark.all.find_by_id(params[:id]).destroy
      render json: {message: "success"}
    else
      render json: @destroy.errors.messages, status:400
    end
  end

private
  def find_bookmark
    @bookmark = current_user.bookmarks.find_by(link: params[:bookmark][:link])
  end

  def bookmark_params
    params.require(:bookmark).permit(:title, :link, :content, :date, :thumbnail_url)
  end

end
