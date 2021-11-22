class UrlHelper {
    createUrl = (params): string => {
        return params.join('/');
    }
}

export const urlHelper = new UrlHelper();
