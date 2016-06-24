Rails.application.routes.draw do

  root 'runs#index'

  resources :runs do
    get 'execute' => 'runs#execute_panel'
    post 'execute' => 'runs#execute'
    get 'resume' => 'runs#resume_panel'
    post 'resume' => 'runs#resume'
    get 'fork' => 'runs#fork'
  end

end
