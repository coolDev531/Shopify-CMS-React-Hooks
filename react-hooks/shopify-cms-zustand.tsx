import produce from "immer";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import create from "zustand";
import { Sections } from ".shopify-cms/types/sections";
import { GlobalSettings } from ".shopify-cms/types/shopify";

export type ShopifyCmsData = {
  global: GlobalSettings;
  globalSections: { [T: string]: Sections };
  order: Sections["id"][];
  sections: { [T: string]: Sections };
};

interface ShopifyCmsState {
  global: GlobalSettings;
  globalSections: { [T: string]: Sections };
  initShopifyCms: (props: {
    global: ShopifyCmsState["global"];
    globalSections: ShopifyCmsState["globalSections"];
    order: ShopifyCmsState["order"];
    sections: ShopifyCmsState["sections"];
  }) => void;
  initiated: boolean;
  isThemeEditor: boolean;
  order: Sections["id"][];
  sections: { [T: string]: Sections };
  setIsThemeEditor: () => void;
  updateShopifyCms: (props: {
    order: ShopifyCmsState["order"];
    sections: ShopifyCmsState["sections"];
  }) => void;
}

export const useShopifyCms = create<ShopifyCmsState>((set) => ({
  initiated: false,
  global: {},
  globalSections: {},
  sections: {},
  order: [],
  isThemeEditor: false,
  setIsThemeEditor: () => {
    set(
      produce((state: ShopifyCmsState) => {
        state.isThemeEditor = true;
      })
    );
  },
  initShopifyCms: (props) => {
    set(
      produce((state: ShopifyCmsState) => {
        state.initiated = true;
        state.global = props.global;
        state.globalSections = props.globalSections;
        state.sections = props.sections;
        state.order = props.order;
      })
    );
  },
  updateShopifyCms: (props) => {
    set(
      produce((state: ShopifyCmsState) => {
        state.sections = props.sections;
        state.order = props.order;
      })
    );
  },
}));

export const ShopifyCms: FC<PropsWithChildren> = ({ children }) => {
  const { globalSections, sections, isThemeEditor, setIsThemeEditor, initShopifyCms } =
    useShopifyCms((state) => ({
      globalSections: state.globalSections,
      sections: state.sections,
      isThemeEditor: state.isThemeEditor,
      setIsThemeEditor: state.setIsThemeEditor,
      initShopifyCms: state.initShopifyCms,
    }));

  const sendSectionSizes = useCallback(
    (e, currentSections = { ...globalSections, ...sections }) => {
      const sectionSizes = Object.values(currentSections)?.map(({ id, ...section }) => {
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
    },
    [globalSections, sections]
  );

  const handleMessages = useCallback((e) => {
    if (e?.data?.source === "theme-editor-zustand") {
      if (!isThemeEditor) {
        setIsThemeEditor();
      }
      document.body.classList.add("overflow-hidden");

      initShopifyCms({
        global: e.data.global,
        globalSections: e.data.globalSections,
        sections: e.data.sections,
        order: e.data.order,
      });

      setTimeout(
        () => {
          sendSectionSizes(null, { ...e.data.globalSections, ...e.data.sections });
        },
        5
      );
    }
  }, [initShopifyCms, isThemeEditor, sendSectionSizes, setIsThemeEditor]);

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
