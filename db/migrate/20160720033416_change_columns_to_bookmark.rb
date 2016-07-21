class ChangeColumnsToBookmark < ActiveRecord::Migration
  def change
    add_column :bookmarks, :thumbnail_url, :string
    add_column :bookmarks, :entry_id, :string
    rename_column :bookmarks, :url, :web_url
    change_column :bookmarks, :content, :text
  end
end
