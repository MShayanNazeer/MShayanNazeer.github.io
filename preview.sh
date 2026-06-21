#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# Prefer Homebrew Ruby 3.3 (macOS system Ruby 2.6 and Ruby 4.x break Jekyll).
if [ -x "/opt/homebrew/opt/ruby@3.3/bin/ruby" ]; then
  export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
elif [ -x "/usr/local/opt/ruby@3.3/bin/ruby" ]; then
  export PATH="/usr/local/opt/ruby@3.3/bin:/usr/local/lib/ruby/gems/3.3.0/bin:$PATH"
elif [ -x "/opt/homebrew/opt/ruby/bin/ruby" ]; then
  export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"
elif [ -x "/usr/local/opt/ruby/bin/ruby" ]; then
  export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/4.0.0/bin:$PATH"
fi

if ! ruby -e 'exit(Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.0.0") ? 0 : 1)'; then
  echo "Ruby 3.0+ is required. Install with: brew install ruby@3.3"
  exit 1
fi

bundle config set --local path vendor/bundle
bundle install

echo "Starting Jekyll at http://127.0.0.1:4000"
echo "Use that URL in your browser — do not open index.html directly or use a plain static server."
bundle exec jekyll serve --livereload --host 127.0.0.1
