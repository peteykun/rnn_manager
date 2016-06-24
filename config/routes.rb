Rails.application.routes.draw do

  root 'runs#index'

  resources :runs do
    get 'execute' => 'runs#execute_panel'
    get 'fork' => 'runs#fork'
    post 'execute' => 'runs#execute'
  end

end
