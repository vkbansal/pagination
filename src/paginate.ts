export interface PaginateWithEllipsisArgs {
	/**
	 * Total number of pages
	 */
	totalPages: number;
	/**
	 * Number of items to show on each page
	 */
	currentPage: number;
	/**
	 *
	 * @default 3
	 */
	innerGroupSize?: number;
	/**
	 * @default 1
	 */
	outerGroupSize?: number;
}

export interface Page {
	page: number;
	active: boolean;
	ellipsis: boolean;
}

export function paginateWithEllipsis(args: PaginateWithEllipsisArgs): Page[] {
	const { totalPages, currentPage, outerGroupSize = 1, innerGroupSize: _innerGroupSize = 3 } = args;

	if (totalPages < 2) {
		return [];
	}

	// this should always be odd
	const innerGroupSize = _innerGroupSize % 2 === 0 ? _innerGroupSize - 1 : _innerGroupSize;
	const entriesCount = innerGroupSize + 2 * outerGroupSize + 2;

	const pages: Page[] = Array.from({ length: entriesCount }, (_, i) => {
		const page = i + 1;

		return {
			page,
			active: currentPage === page,
			ellipsis: false,
		};
	});

	if (totalPages >= 2 && totalPages <= entriesCount) {
		return pages;
	}

	const leftEllipsis = currentPage > outerGroupSize + 1 + Math.ceil(innerGroupSize / 2);
	const rightEllipsis = currentPage < totalPages - outerGroupSize - Math.ceil(innerGroupSize / 2);

	if (leftEllipsis) {
		pages[outerGroupSize] = { page: -1, active: false, ellipsis: true };
	}

	if (rightEllipsis) {
		pages[entriesCount - outerGroupSize - 1] = { page: -1, active: false, ellipsis: true };
	}

	if (leftEllipsis && rightEllipsis) {
		const centerIndex = Math.floor(entriesCount / 2);
		const updateCount = Math.floor(innerGroupSize / 2);

		pages[centerIndex] = {
			page: currentPage,
			active: true,
			ellipsis: false,
		};

		times(updateCount, (i) => {
			const page = currentPage + i + 1;
			pages[centerIndex + i + 1] = {
				page,
				active: currentPage === page,
				ellipsis: false,
			};
		});

		times(updateCount, (i) => {
			const page = currentPage - i - 1;
			pages[centerIndex - i - 1] = {
				page,
				active: currentPage === page,
				ellipsis: false,
			};
		});
	} else if (leftEllipsis && !rightEllipsis) {
		times(innerGroupSize + 1, (i) => {
			const page = totalPages - outerGroupSize - i;
			pages[entriesCount - outerGroupSize - i - 1] = {
				page,
				active: currentPage === page,
				ellipsis: false,
			};
		});
	} else if (!leftEllipsis && rightEllipsis) {
		times(innerGroupSize, (i) => {
			const page = outerGroupSize + i + 1;
			pages[outerGroupSize + i] = {
				page,
				active: currentPage === page,
				ellipsis: false,
			};
		});
	}

	times(outerGroupSize, (i) => {
		const page = totalPages - i;
		pages[entriesCount - 1 - i] = {
			page,
			active: currentPage === page,
			ellipsis: false,
		};
	});

	return pages;
}

export function getTotalPages(totalItems: number, pageSize: number): number {
	return Math.ceil(totalItems / Math.max(1, pageSize));
}

export function getPageNumbers(totalPages: number): number[] {
	return Array.from({ length: totalPages }, (_, i) => i + 1);
}

function times(n: number, callback: (n: number) => void): void {
	for (let i = 0; i < n; i++) {
		callback(i);
	}
}
