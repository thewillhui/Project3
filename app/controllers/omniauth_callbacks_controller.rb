class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  def redirect_callbacks

    # derive target redirect route from 'resource_class' param, which was set
    # before authentication.
    devise_mapping = [request.env['omniauth.params']['namespace_name'],
                      request.env['omniauth.params']['resource_class'].underscore.gsub('/', '_')].compact.join('_')
    # redirect_route = "#{request.protocol}#{request.host_with_port}/#{Devise.mappings[devise_mapping.to_sym].fullpath}/#{params[:provider]}/callback"
    redirect_route = root_path

    # preserve omniauth info for success route. ignore 'extra' in twitter
    # auth response to avoid CookieOverflow.
    session['dta.omniauth.auth'] = request.env['omniauth.auth'].except('extra')
    session['dta.omniauth.params'] = request.env['omniauth.params']

    redirect_to redirect_route
  end
end