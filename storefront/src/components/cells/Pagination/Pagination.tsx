"use client"
import { PaginationButton } from "@/components/atoms"
import { CollapseIcon, MeatballsMenuIcon } from "@/icons"

export const Pagination = ({
  pages,
  setPage,
  currentPage,
}: {
  pages: number
  setPage: (page: number) => void
  currentPage: number
}) => {
  const renderPaginationButtons = () => {
    const buttons = [] as React.ReactNode[]

    if (currentPage > 2) {
      buttons.push(
        <PaginationButton key={`gap-left`} disabled aria-label="More pages">
          <MeatballsMenuIcon />
        </PaginationButton>
      )
    }

    if (currentPage > 1) {
      buttons.push(
        <PaginationButton
          key={`page-${currentPage - 1}`}
          aria-label={`Go to page ${currentPage - 1}`}
          onClick={() => setPage(currentPage - 1)}
        >
          {currentPage - 1}
        </PaginationButton>
      )
    }

    buttons.push(
      <PaginationButton
        key={`page-${currentPage}`}
        isActive
        aria-label={`Current page, page ${currentPage}`}
      >
        {currentPage}
      </PaginationButton>
    )

    if (currentPage < pages) {
      buttons.push(
        <PaginationButton
          key={`page-${currentPage + 1}`}
          aria-label={`Go to page ${currentPage + 1}`}
          onClick={() => setPage(currentPage + 1)}
        >
          {currentPage + 1}
        </PaginationButton>
      )
    }

    if (currentPage < pages - 1) {
      buttons.push(
        <PaginationButton key={`gap-right`} disabled aria-label="More pages">
          <MeatballsMenuIcon />
        </PaginationButton>
      )
    }

    return buttons
  }

  return (
    <div className="flex items-center">
      <PaginationButton
        disabled={Boolean(currentPage === 1)}
        onClick={() => setPage(currentPage - 1)}
        className="border-none"
        aria-label="Previous page"
      >
        <CollapseIcon size={20} className="rotate-90" />
      </PaginationButton>

      {renderPaginationButtons()}

      <PaginationButton
        disabled={Boolean(currentPage === pages)}
        onClick={() => setPage(currentPage + 1)}
        className="border-none"
        aria-label="Next page"
      >
        <CollapseIcon size={20} className="-rotate-90" />
      </PaginationButton>
    </div>
  )
}
