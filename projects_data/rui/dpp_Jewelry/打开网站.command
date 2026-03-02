#!/bin/bash
cd "$(dirname "$0")"
open -a "Safari" "index-standalone.html" || open -a "Google Chrome" "index-standalone.html" || open -a "Firefox" "index-standalone.html" || open "index-standalone.html"

