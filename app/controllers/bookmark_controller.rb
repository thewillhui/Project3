class BookmarkController < ApplicationController
  def index
    @bookmark = current_user.bookmark
  end

  def create
    # @bookmark = Bookmark.create(
    #   user_id: current_user.id,
    #   web_url: bookmark_params.id,
    #   title: bookmark_params.title,
    #   content: bookmark_params.content,
    #   thumbnail_url: bookmark_params.imageUrl,
    #   published: bookmark_params.published
    # )
    bookmark = Bookmark.create(bookmark_params)
    bookmark.update_attributes(user_id: current_user.id)
    # if bookmark.exist?(web_url: params[:bookmark][:web_url])
      if bookmark.save
        render json: bookmark
      else
        render json: @post.errors.messages, status: 400
      end
    # else
    #   render json: {message: "This bookmark has been added already"}
    # end
  end

  def destroy
    if @bookmark.find_by_id(params[:id]).destroy
      render json: {message: "success"}
    else
      render json: @destroy.errors.messages, status:400
    end
  end

private
  def bookmark_params
    params.require(:bookmark).permit(:title, :web_url, :content, :published, :thumbnail_url)
  end

end
