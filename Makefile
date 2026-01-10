#!/usr/bin/make -f
.PHONY: install dev build start \
	lint lint-fix format format-check typecheck quality pre-commit

install:
	@echo "Installing dependencies..."
	npm install --legacy-peer-deps

dev: install
	@echo "Starting development server..."
	npm run dev

build: install
	@echo "Building app for production..."
	npm run build

start: build
	@echo "Starting app..."
	npm run start

storybook:
	@echo "Starting Storybook..."
	npm run storybook

# Code Quality Commands
lint:
	@echo "Running ESLint..."
	npx eslint .

lint-fix:
	@echo "Running ESLint with auto-fix..."
	npm run lint:fix

format:
	@echo "Running Prettier to format code..."
	npm run format

format-check:
	@echo "Checking code formatting..."
	npm run format:check

typecheck:
	@echo "Running TypeScript compilation check..."
	npx tsc --noEmit

quality: format lint typecheck
	@echo "All code quality checks passed!"

pre-commit: format-check lint typecheck
	@echo "Pre-commit checks complete!"
