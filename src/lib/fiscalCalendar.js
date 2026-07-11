/**
 * RIM "Current Fiscal Month" input: months elapsed since the start of the
 * current fiscal year (counted from the month AFTER the last FYE, not the
 * FYE month itself).
 *
 * Edge case: if today falls between the fiscal year-end date and the date
 * that fiscal year's own annual earnings are actually reported, the market
 * is still treating the PRIOR reported fiscal year as the anchor (the new
 * FY's results aren't out yet) - so the count should keep climbing past 12
 * (13, 14, 15+) rather than resetting to a low number.
 *
 * IMPORTANT: `earningsReleaseForLastFiscalYear` must be the specific release
 * that reports results FOR `lastFiscalYearEndDate` (i.e. the first earnings
 * release after that FYE) - not just "whatever earnings release is next
 * chronologically." For a company well into its new fiscal year, the next
 * *chronological* release is some later quarter, and using that would
 * incorrectly re-trigger the edge case months after it stopped applying.
 */
export function computeCurrentFiscalMonth({ lastFiscalYearEndDate, earningsReleaseForLastFiscalYear, asOfDate }) {
  const fye = new Date(lastFiscalYearEndDate)
  const earnings = earningsReleaseForLastFiscalYear ? new Date(earningsReleaseForLastFiscalYear) : null
  const today = asOfDate ? new Date(asOfDate) : new Date()

  let anchor = fye
  if (today >= fye && earnings && today < earnings) {
    anchor = new Date(fye.getFullYear() - 1, fye.getMonth(), fye.getDate())
  }

  const months = (today.getFullYear() - anchor.getFullYear()) * 12 + (today.getMonth() - anchor.getMonth())
  return Math.max(1, months)
}
