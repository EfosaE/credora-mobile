// receipt-preview.tsx

import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { File } from "expo-file-system";

export default function PDFPreview() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  console.log("Received URI:", uri);

  useEffect(() => {
    const loadPdf = async () => {
      const base64 = await new File(uri).base64();
      setPdfBase64(base64);
    };

    loadPdf();
  }, [uri]);

  if (!pdfBase64) return null;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: `
          <html>
            <body style="margin:0;">
              <embed 
                width="100%" 
                height="100%" 
                src="data:application/pdf;base64,${pdfBase64}" 
                type="application/pdf"
              />
            </body>
          </html>
        `,
      }}
      style={{ flex: 1 }}
    />
  );
}
