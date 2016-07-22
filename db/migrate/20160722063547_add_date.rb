class AddDate < ActiveRecord::Migration
  def change
    add_column :bookmarks, :date, :string
  end
end
