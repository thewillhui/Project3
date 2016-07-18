class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  def render_data_or_redirect(message, data, user_data = {})

    # We handle inAppBrowser and newWindow the same, but it is nice
    # to support values in case people need custom implementations for each case
    # (For example, nbrustein does not allow new users to be created if logging in with
    # an inAppBrowser)
    #
    # See app/views/devise_token_auth/omniauth_external_window.html.erb to understand
    # why we can handle these both the same.  The view is setup to handle both cases
    # at the same time.

    # if ['inAppBrowser', 'newWindow'].include?(omniauth_window_type)
    if ENV["JTOKER_OAUTH_WINDOW_TYPE"].present?
      render_data(message, user_data.merge(data))

    elsif auth_origin_url # default to same-window implementation, which forwards back to auth_origin_url

      # build and redirect to destination url
      redirect_url = root_url
      redirect_to DeviseTokenAuth::Url.generate(redirect_url, data.merge(blank: true))
    else

      # there SHOULD always be an auth_origin_url, but if someone does something silly
      # like coming straight to this url or refreshing the page at the wrong time, there may not be one.
      # In that case, just render in plain text the error message if there is one or otherwise
      # a generic message.
      fallback_render data[:error] || 'An error occurred'
    end
  end
end