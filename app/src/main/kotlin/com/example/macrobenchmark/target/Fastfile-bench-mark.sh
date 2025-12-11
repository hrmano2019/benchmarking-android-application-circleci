# Fastfile snippet for iOS benchmarking
lane :run_and_benchmark do |options|
  # 1. SETUP: Dynamic Dependency Management (optional, if using CocoaPods/Carthage)
  # fastlane action 'cocoapods' handles dependency restoration efficiently
  cocoapods 

  # 2. EXECUTION: Run XCUITest with Performance Metrics
  # Use 'scan' (fastlane's testing tool) to execute tests
  scan(
    scheme: "YourAppScheme",
    device: options[:simulator_device] || "iPhone 15",
    output_directory: "./test_output",
    # Enable XCUITest to gather performance data via XCTMetric
    # Note: Performance metrics are often captured automatically if XCTMetrics are used in the tests
  )

  # 3. EXTRACTION: Find the test results file
  # The results are stored in the xcresult bundle
  results_path = lane_context[SharedValues::SCAN_DERIVED_DATA_PATH] + "/Logs/Test/*.xcresult"
  
  # 4. ANALYSIS: Extract performance data using custom script
  # We use a helper script for detailed parsing and regression check
  sh("./ci/scripts/extract_and_report_perf.sh #{results_path}")

  # The shell script (defined below) will handle the dynamic regression check 
  # and the reporting/upload to Firebase or other RPM tool.
end
