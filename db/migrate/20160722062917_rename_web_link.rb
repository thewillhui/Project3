class RenameWebLink < ActiveRecord::Migration
  def change
    add_column :bookmarks, :link, :string
  end
end
