# Overview

This example shows how to use
[@opentelemetry/exporter-trace-otlp-http](https://github.com/open-telemetry/opentelemetry-js/tree/v0.28.0/experimental/packages/exporter-trace-otlp-http)
and [@opentelemetry/exporter-metrics-otlp-http](https://github.com/open-telemetry/opentelemetry-js/tree/v0.28.0/experimental/packages/opentelemetry-exporter-metrics-otlp-http)
to instrument a simple Node.js application.

## Installation

```shell script
# from this directory
npm install
```

## Run the Application

1. Run docker

    ```shell script
    # from this directory
    npm run docker:start
    ```

2. Run tracing app

    ```shell script
    # from this directory
    npm run start:tracing
    ```

4. Open page at <http://localhost:9411/zipkin/> -  you should be able to see the spans in zipkin
![Screenshot of the running example](images/spans.png)

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more information on tracing, visit: <https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-sdk-trace-base>

## LICENSE

Apache License 2.0
