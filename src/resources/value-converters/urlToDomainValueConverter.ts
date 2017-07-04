export class UrlToDomainValueConverter {
  public toView(value) {
    if (value === undefined || value === null || value.length === 0) {
      return '';
    }
    return new URL(value).host;
  }
}
