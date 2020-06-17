# NowSecure Github Actions Integration

Action to upload a mobile app binary (.apk, .ipa) to the NowSecure Platform.

Takes three inputs:

`app-path`: The path to the binary artifact being uploaded  
`api-key`: The API bearer token generated in NowSecure Platform  
`group-id`: the group ID of the binary being uploaded. This can be found in the UI under the name of the app in the app summary page. 


Sample configuration:

```yaml
name: CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: NowSecure Platform Integration
      uses: blawrencens/nowsecure-actions-integration@0.4.4
      with:
        # Please provide the path for the app to be uploaded
        app-path: "/home/runner/work/CircleCIIntegration/CircleCIIntegration/anydo39.apk"
        # Please provide the API Key for NowSecure Platform
        api-key: ${{ secrets.PLATFORM_API_KEY }}
        # Please provide the Group Id of the application being integrated
        group-id: "a43a22b7-d9a0-4b1e-81b8-0f047029e0f5"
```