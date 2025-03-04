#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 true|false"
  exit 1
fi

VALUE="$1"
if [ "$VALUE" != "true" ] && [ "$VALUE" != "false" ]; then
  echo "Invalid value. Please use 'true' or 'false'."
  exit 1
fi

FILE="shared/config/app-constants.ts"

if [ ! -f "$FILE" ]; then
  echo "File $FILE does not exist."
  exit 1
fi

# Using extended regex and POSIX whitespace
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -E -i '' "s/^export const IS_DETOX_ENV[[:space:]]*=.*/export const IS_DETOX_ENV = VALUE;/" "$FILE"
else
  sed -E -i "s/^export const IS_DETOX_ENV[[:space:]]*=.*/export const IS_DETOX_ENV = process.env.EXPO_PUBLIC_IS_DETOX === '$VALUE';/" "$FILE"
fi

echo "IS_DETOX_ENV set to $VALUE in $FILE"
