class AddColumnToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :folder, :string
    add_column :subscriptions, :logoUrl, :string
  end
end
