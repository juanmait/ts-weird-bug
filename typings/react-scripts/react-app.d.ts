/// <reference path="@types/googlemaps/index.d.ts" />

window.google = window.google || {}
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string

    /**
     * autofill login from?
     */
    readonly LOGIN_ENABLE_DEV_CREDS: 'yes' | 'no'

    /**
     * default autofill email (enabled only if LOGIN_ENABLE_DEV_CREDS = true)
     */
    readonly LOGIN_DEV_CREDS_EMAIL: string | undefined

    /**
     * default autofill password (enabled only if LOGIN_ENABLE_DEV_CREDS = true)
     */
    readonly LOGIN_DEV_CREDS_PASSWORD: string | undefined

    /**
     * Token name used as key to store the user session token in localStorage
     */
    readonly REACT_APP_TOKEN_NAME: string | undefined

    /**
     * delay after user stop typing to trigger input validation
     */
    readonly REACT_APP_INPUT_VALIDATION_TIMEOUT: string | undefined

    /**
     * root path for the react app (all sub paths will have this common root)
     * e.g: /my-base-path/login
     */
    readonly REACT_APP_BASE_PATH: string | undefined

    /**
     * google api key
     */
    readonly REACT_APP_GOOGLE_API_KEY: string | undefined

    /**
     * csv parser object delimiter character
     */
    readonly REACT_APP_CHAR_DELIMIT: string | undefined

    /**
     * sms code verification length
     */
    readonly REACT_APP_UNCONFIRMED_SMS_CODE_LEN: string | undefined

    /**
     * twilio will send this code if the used phone
     * number is invalid
     */
    readonly REACT_APP_TWILIO_CODE_INVALID_PHONE: string | undefined

    /**
     * Sentry Token
     * @see https://sentry.io/settings/patagonian-tech/projects/conversifi/
     */
    readonly REACT_APP_SENTRY_DSN: string | undefined

    /**
     * Environment in which the app is running
     */
    readonly REACT_APP_ENV: 'local' | 'qa' | 'uat' | 'prod'

    /**
     * Interval to make request to the search-insights service in seconds.
     * IMPORTANT: please, take into account the `CRON_INTERVAL` value
     * on `docker-compose.yml`. That value determines the interval in which
     * the stats are generated on the server
     */
    readonly REACT_APP_SEARCH_INSIGHTS_REQUEST_INTERVAL: string | undefined
  }
}
