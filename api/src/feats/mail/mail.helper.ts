const mailHelper = {
  /**
   * Get Token data from the toke
   *
   * @param token
   * @returns {object}
   */
  getTokenData: (token: string) => {
    const tokenData = mailHelper.splitToken(token);
    const tokenPayload = JSON.parse(atob(tokenData.payload));

    /**
     * Add the locig to get data from the base64 encoded token
     */

    return tokenPayload;
  },

  /**
   * This function will split the token and return further information
   *
   * @param token
   * @returns {object}
   */
  splitToken: (token: string) => {
    const tokenArray = token.split('.');
    const tokenData = {
      header: tokenArray[0],
      payload: tokenArray[1],
      signature: tokenArray[2],
    };
    return tokenData;
  },
};

export default mailHelper;
