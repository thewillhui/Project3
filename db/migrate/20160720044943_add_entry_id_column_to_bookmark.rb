class AddEntryIdColumnToBookmark < ActiveRecord::Migration
  def change
    add_column :bookmarks, :entry_id, :string
  end
end
