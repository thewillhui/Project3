Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks:  'omniauth_callbacks'
  }

  root 'statics#home'

  # get '/signup', to: 'auth#signup'
  # get '/login', to: 'auth#login'
  get '/secret', to: 'statics#secret'
  get '/search', to: 'statics#search' # delete whole mvc on production
  get '/feedlr/search', to: 'feedlr#search'

  post '/bookmark', to: 'bookmark#create'
  get '/bookmark', to: 'bookmark#index'
  delete '/bookmark/:id', to: 'bookmark#destroy'

  get '/subscriptions', to: 'subscriptions#index'
  get '/subscriptions/folder', to: 'subscriptions#getFolders'
  post '/subscriptions/add', to: 'subscriptions#add'
  put '/subscriptions/folder/:id', to: 'subscriptions#addToFolder'
  delete '/subscriptions/delete/:id', to: 'subscriptions#destroy'
  put '/edit/:id', to: 'subscriptions#edit'
  get '/getsubscriptions', to: 'subscriptions#getSubscriptions'
  get '/manage', to: 'subscriptions#manage'

  # for testing purpose only
  get '/test/feed', to: 'subscriptions#feed'
  get '/test/entry', to: 'subscriptions#entries'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
