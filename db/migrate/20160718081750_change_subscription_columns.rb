class ChangeSubscriptionColumns < ActiveRecord::Migration
  def change
    remove_column :subscriptions, :folder
  end
end
