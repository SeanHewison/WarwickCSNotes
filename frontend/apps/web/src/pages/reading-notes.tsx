import { useEffect } from "react"
import { Construction } from "lucide-react"
import { Page } from "@/components/page"
import { PageHeader } from "@/components/page-header"
import { PageSection } from "@/components/page-section"

/** Shown under each heading until the prose is written, so the page reads as
 *  deliberately unfinished rather than broken. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return <p className="max-w-3xl text-sm text-muted-foreground">{children}</p>
}

export const ReadingNotesPage = () => {
  useEffect(() => {
    document.title = "Reading Notes"
  }, [])

  return (
    <Page>
      <PageHeader
        title="Reading Notes"
        subtitle="How to get the most out of the notes on this site."
      />

      <p className="mb-8 inline-flex items-center gap-2 rounded border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-sm text-amber-600 dark:text-amber-400">
        <Construction className="h-4 w-4 shrink-0" aria-hidden="true" />
        This guide is still being written.
      </p>

      <PageSection title="WarwickCSNotes Features" className="mb-10">
        <Placeholder>
          A tour of what the notes give you beyond plain text: collapsible
          callouts, verified and unfinished badges, quizzes, and past paper
          solutions.
        </Placeholder>
      </PageSection>

      <PageSection title="Iterative Learning" className="mb-10">
        <Placeholder>
          Why a single pass through a set of notes isn't enough, and how to use
          repeated passes at increasing depth.
        </Placeholder>
      </PageSection>

      <PageSection title="External Resources" className="mb-10">
        <Placeholder>
          How to fit textbooks, lecture recordings and other people's notes
          around these ones.
        </Placeholder>
      </PageSection>
    </Page>
  )
}
