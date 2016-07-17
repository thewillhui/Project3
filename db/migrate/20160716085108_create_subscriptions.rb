class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|

      t.string :url
      t.string :folder
      t.timestamps null: false
    end
  end
end
