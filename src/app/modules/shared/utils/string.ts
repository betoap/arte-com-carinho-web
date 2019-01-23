export class String {

  public static trim (str) {
    return str.replace(/^\s+|\s+$/gm, '');
  }

}
