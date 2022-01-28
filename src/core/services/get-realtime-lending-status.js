/*
 * Helper function to fetch real-time lending status
 */
export default function getRealTimeLendingStatus(identifier) {
  let url = `https://ia-petabox-neeraj.archive.org/services/book/lending-info.php?identifier=${identifier}`;

  if (window.location.pathname === '/demo/') {
    url = ''; // change URL to prevent error on localhost
  }

  fetch(url)
    .then(response => {
      // return { response_code: '400', data: 'error happened' };
      return response.json();
    })
    .then(response => {
      console.log(response);
      if (response?.response_code === 200) {
        const lendingInfo = response?.body?.data?.lendingInfo;
        let newLendingInfo = lendingInfo;
        const newLendingStatus = lendingInfo?.lendingStatus;
        newLendingInfo = { ...newLendingInfo, ...newLendingStatus };
        newLendingInfo.lendingStatus = '';
        return newLendingInfo;
      }
      return null;
    })
    .catch(response => {
      return response;
    });
}
