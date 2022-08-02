import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Sections } from ".shopify-cms/types/sections";
import { GlobalSettings } from ".shopify-cms/types/shopify";

function makeStore<S>(defaultValue: S, displayName = "") {
  const context = createContext<[S, Dispatch<SetStateAction<S>>]>([defaultValue, () => {}]);

  if (displayName !== "") {
    context.displayName = displayName;
  }
  const Provider = ({ init = defaultValue, children }: { children: any; init?: S }) => {
    const [state, setState] = useState<S>(init);
    const contextValue = useMemo<[S, Dispatch<SetStateAction<S>>]>(
      () => [state, setState],
      [state]
    );
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };
  const useStore = () => useContext<[S, Dispatch<SetStateAction<S>>]>(context);
  return { Provider, useStore };
}

const { Provider, useStore } = makeStore<{ global: GlobalSettings; sections: Sections[] }>(
  { global: null, sections: [] },
  "ShopifyThemeStore"
);

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
      if (!isThemeEditor) {
        setIsThemeEditor((current) => true);
      }
      document.body.classList.add("overflow-hidden");

      setShopifyData((current) => ({ global: e.data.global, sections: e.data.sections }));

      setTimeout(
        () => {
          sendSectionSizes(null, e.data.sections);
        },
        5
      );
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

export const ShopifyCms: FC<PropsWithChildren<ShopifyCmsProps>> = ({
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
