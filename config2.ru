# config.ru

require 'faye'
bayeux = Faye::RackAdapter.new(:mount => '/faye', :timeout => 25)
run bayeux

Faye::WebSocket.load_adapter('thin')
