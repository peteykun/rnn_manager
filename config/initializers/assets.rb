# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( flot/excanvas.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.colorhelpers.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.canvas.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.categories.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.crosshair.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.errorbars.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.fillbetween.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.image.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.navigate.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.pie.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.resize.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.selection.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.stack.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.symbol.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.threshold.min.js )
Rails.application.config.assets.precompile += %w( flot/jquery.flot.time.min.js )
