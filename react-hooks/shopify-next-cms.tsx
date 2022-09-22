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

const { Provider: SectionsProvider, useStore: useSectionsStore } = makeStore<{
  sectionOrder: Sections["id"][];
  sections: Sections[];
}>({ sectionOrder: [], sections: [] }, "Shopify Sections");

const { Provider: GlobalsProvider, useStore: useGlobalsStore } = makeStore<{
  global: GlobalSettings | null;
  globalSections: Sections[];
}>({ global: null, globalSections: [] }, "Shopify Globals");

export const useShopifySections = useSectionsStore;
export const useShopifyGlobals = useGlobalsStore;
export const ShopifyGlobalsProvider = GlobalsProvider;
export const ShopifySectionsProvider = SectionsProvider;

type ShopifyCmsProps = {
  global: GlobalSettings;
  sections: Sections[];
};

export const InitShopifyNextCms: FC<PropsWithChildren> = ({ children }) => {
  const [{ sectionOrder, sections }, setShopifySections] = useShopifySections();
  const [{ global, globalSections }, setShopifyGlobals] = useShopifyGlobals();
  const [isThemeEditor, setIsThemeEditor] = useState(false);

  const sendSectionSizes = useCallback((e, currentSections = sections) => {
    const sectionSizes = currentSections?.map(({ id, ...section }) => {
      const blocks: {
        id: string | number;
        rect?: DOMRect;
      }[] = [];
      if ("blocks" in section) {
        section?.blocks?.forEach(({ id: blockId }) => {
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

      setShopifySections((current) => ({
        sections: e.data.sections?.filter((section) => section.global),
        sectionOrder: e.data.sections?.map(({ id }) => id),
      }));

      setShopifyGlobals((current) => ({
        global: e.data.global,
        globalSections: e.data.sections?.filter((section) => section.global),
      }));

      setTimeout(
        () => {
          sendSectionSizes(null, e.data.sections);
        },
        5
      );
    }
  }, [isThemeEditor, sendSectionSizes, setShopifyGlobals, setShopifySections]);

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

export const ShopifyNextCms: FC<PropsWithChildren<ShopifyCmsProps>> = ({
  sections,
  global,
  children,
}) => {
  return (
    <>
      <ShopifyGlobalsProvider
        init={{ global: global, globalSections: sections?.filter((section) => section.global) }}
      >
        <ShopifySectionsProvider
          init={{
            sections: sections?.filter((section) => !section.global),
            sectionOrder: sections?.map(({ id }) => id),
          }}
        >
          <InitShopifyNextCms>{children}</InitShopifyNextCms>
        </ShopifySectionsProvider>
      </ShopifyGlobalsProvider>
    </>
  );
};
