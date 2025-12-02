declare module "react-html-parser" {
  const ReactHtmlParser: (
    html: string,
    options?: {
      transform?: (node: any) => React.ReactNode;
      decodeEntities?: boolean;
    }
  ) => React.ReactNode;

  export default ReactHtmlParser;
}
