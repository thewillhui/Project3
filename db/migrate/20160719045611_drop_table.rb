class DropTable < ActiveRecord::Migration
  def change
    drop_table :entries
    drop_table :feeds
  end
end
