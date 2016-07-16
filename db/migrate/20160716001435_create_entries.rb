class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :title
      t.string :feed_id
      t.string :url
      t.string :author
      t.text :content
      t.string :image_url
      t.string :published

      t.timestamps null: false
    end
  end
end
