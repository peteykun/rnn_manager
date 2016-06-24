require 'eventmachine'
require 'faye'

EM.run {
  client = Faye::Client.new('http://localhost:9292/faye')
  client.publish('/messages/new', 'text' => 'Hello!')
}
