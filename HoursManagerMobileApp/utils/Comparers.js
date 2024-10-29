/** Comparing functions */

export function isFirstDateAfterSecondDate(firstDate, secondDate)
{
    // Return true if first date comes after the second
    // Grab time of both firstDate and secondDate
    const firstDateTime = firstDate.getTime();
    const secondDateTime = secondDate.getTime();

    return firstDateTime > secondDateTime;
}