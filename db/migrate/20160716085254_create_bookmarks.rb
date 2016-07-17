class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|

      t.string :user_id
      t.string :title
      t.string :url
      t.string :author
      t.string :content
      t.string :published
      t.timestamps null: false
    end
  end
end