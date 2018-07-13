#!/bin/bash
curl -s https://github.com/artisan-roaster-scope/artisan/releases/latest | cut -d\" -f2 | rev | cut -d/ -f1 | rev 2>/config/versionartisanhtml.err