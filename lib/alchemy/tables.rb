module Alchemy
  module Tables
    class Engine < ::Rails::Engine
      isolate_namespace Alchemy::Tables

      initializer "alchemy.assets.paths" do |app|
        app.config.assets.paths << "#{self.root}"
      end

    end
  end
end
