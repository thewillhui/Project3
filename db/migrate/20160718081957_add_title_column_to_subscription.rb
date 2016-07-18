class AddTitleColumnToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :title, :string
    add_column :subscriptions, :user_id, :string
  end
end
