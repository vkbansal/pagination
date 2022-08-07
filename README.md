# Pagination

Helpers for pagination.

## Usage

Install via npm

```sh
npm install @vkbansal/pagination
```

Use as follows

```ts
import { getTotalPages } from '@vkbansal/pagination';

const totalItems = 102;
const pageSize = 10;

const totalPages = getTotalPages(totalItems / pageSize); // 11
```

## API

The package exposes the following methods:

- getTotalPages
- getPageNumbers
- paginateWithEllipsis

### getTotalPages

Given the total items count and the page size, return the total number of pages

```ts
getTotalPages(totalItems: number, pageSize: number): number
```

### getPageNumbers

Given a number `n`, returns an array of numbers starting from 1 up to `n`, inclusive of `n`.

```ts
getPageNumbers(totalPages: number): number[]
```

### paginateWithEllipsis

Given the total number of pages and current pages, returns an array of `Page` objects, which can be used to create a pagination component with an ellipsis as shown below:

![pagination](./pagination.png)

```ts
paginateWithEllipsis(args: PaginateWithEllipsisArgs): Page[]

interface PaginateWithEllipsisArgs {
	totalPages: number;
	currentPage: number;
	innerGroupSize?: number;
	outerGroupSize?: number;
}

interface Page {
	page: number;
	active: boolean;
	ellipsis: boolean;
}
```

> Note: The value of page will be `-1` when `ellipsis` is `true`

## LICENSE

[MIT](./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)
