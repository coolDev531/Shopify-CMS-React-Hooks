import { makeStore } from "./_make-store";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Sections } from ".shopify-cms/types/sections";
import { GlobalSettings } from ".shopify-cms/types/shopify";

const { Provider, useStore } = makeStore({ global: null, sections: [] }, "ShopifyThemeStore");

export const useShopifyData = useStore;
export const ShopifyDataProvider = Provider;

type ShopifyCmsProps = {
  global: GlobalSettings;
  sections: Sections[];
};

export const InitShopifyCms: FC<PropsWithChildren> = ({ children }) => {
  const [{ global, sections }, setShopifyData] = useShopifyData();
  const [isThemeEditor, setIsThemeEditor] = useState(false);

  const sendSectionSizes = useCallback((e, currentSections = sections) => {
    const sectionSizes = currentSections?.map(({ id, ...section }) => {
      const blocks = [];
      if ("blocks" in section) {
        section.blocks.forEach(({ id: blockId }) => {
          blocks.push({
            id: blockId,
            rect: document.getElementById(`block--${blockId}`)?.getBoundingClientRect(),
          });
        });
      }
      return {
        id,
        height: document.getElementById(`section--${id}`)?.clientHeight ?? 0,
        blocks,
      };
    });

    window?.parent?.postMessage(
      {
        source: "theme-content",
        topic: "resize",
        totalHeight: document.body.clientHeight + 30,
        sectionSizes,
      },
      "*"
    );
  }, [sections]);

  const handleMessages = useCallback((e) => {
    if (e?.data?.source === "theme-editor") {
      if (e.data.topic === "activateThemeEditor") {
        setIsThemeEditor((current) => true);
        document.body.classList.add("overflow-hidden");
      }

      if (e.data.topic === "deactivateThemeEditor") {
        setIsThemeEditor((current) => false);
        document.body.classList.remove("overflow-hidden");
      }

      if (!isThemeEditor) return;

      setShopifyData((current) => ({ global: e.data.global, sections: e.data.sections }));

      sendSectionSizes(null, e.data.sections);
    }
  }, [isThemeEditor, sendSectionSizes, setShopifyData]);

  useEffect(() => {
    window.addEventListener("message", handleMessages);
    return () => {
      window.removeEventListener("message", handleMessages);
    };
  }, [handleMessages, sections]);

  useEffect(() => {
    if (isThemeEditor) {
      window.addEventListener("resize", sendSectionSizes);
    }

    if (!isThemeEditor) {
      window.removeEventListener("resize", sendSectionSizes);
    }
    return () => {
      window.removeEventListener("resize", sendSectionSizes);
    };
  }, [handleMessages, isThemeEditor, sections, sendSectionSizes]);

  return <>{children}</>;
};

export const useShopifyCms: FC<PropsWithChildren<ShopifyCmsProps>> = ({
  sections,
  global,
  children,
}) => {
  return (
    <>
      <ShopifyDataProvider init={{ sections: sections, global: global }}>
        <InitShopifyCms>{children}</InitShopifyCms>
      </ShopifyDataProvider>
    </>
  );
};
