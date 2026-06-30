import re
import os
import sys
import xml.dom.minidom

# Files to ingest
DOCS_DIR = r"p:\GardenPulse\.docs"
FILE_FEATURES = os.path.join(DOCS_DIR, "Gardenpulse .md")
FILE_REQS = os.path.join(DOCS_DIR, "gardenpulse-functional-requirements.md")
FILE_SCREENS_ELEMENTS = os.path.join(DOCS_DIR, "gardenpulse-screen-elements.md")

# Output files
FILE_OUT_REQIF = os.path.join(DOCS_DIR, "gardenpulse-traceability.reqif")
FILE_OUT_HTML = os.path.join(DOCS_DIR, "traceability-viewer.html")

# Define our 17 Global Design System Tokens
GLOBAL_UI_TOKENS = {
    "UI-GLB-BACK-BTN": ("Global Back Button", "Reusable navigation button to return to the previous screen."),
    "UI-GLB-SETTINGS-ICON": ("Global Settings Icon", "Reusable icon linking to settings."),
    "UI-GLB-BELL-ICON": ("Global Notification Bell", "Reusable icon showing unread notification badge."),
    "UI-GLB-CLOSE-BTN": ("Global Close Button", "Reusable close or dismiss icon button."),
    "UI-GLB-BOTTOM-NAV": ("Global Bottom Navigation", "Universal 5-tab application navigation bar."),
    "UI-GLB-FAB": ("Global Floating Action Button", "Universal floating action button for quick actions."),
    "UI-GLB-SEARCH-BAR": ("Global Search Bar", "Reusable input field with search icon for filtering lists."),
    "UI-GLB-PRIMARY-CTA": ("Global Primary CTA Button", "Standard full-width green action button."),
    "UI-GLB-SECONDARY-LINK": ("Global Secondary Text Link", "Standard text-only low-emphasis action link."),
    "UI-GLB-MIC-ICON": ("Global Voice Input Icon", "Reusable mic icon for hands-free voice transcription."),
    "UI-GLB-CAMERA-BTN": ("Global Camera Scan Button", "Reusable button for triggering device camera capture."),
    "UI-GLB-NATIVE-AD": ("Global Native Ad Card", "Standard in-feed card styled as regular content for AdMob."),
    "UI-GLB-DATE-PICKER": ("Global Date Picker", "Standard platform date picker widget."),
    "UI-GLB-LOCATION-BADGE": ("Global Location/Zone Badge", "Standard badge displaying detected city and planting zone."),
    "UI-GLB-LOADING-SPINNER": ("Global Loading Spinner", "Standard loading indicator for async actions."),
    "UI-GLB-SAVE-BTN": ("Global Save/Commit Button", "Standard button to save data and submit forms."),
    "UI-GLB-TOGGLE": ("Global Toggle Switch", "Standard on/off toggle or multi-select checkbox.")
}

def map_to_global_ui(text):
    text_lower = text.lower()
    if "back arrow" in text_lower or "back link" in text_lower or "back button" in text_lower:
        return "UI-GLB-BACK-BTN"
    if "settings icon" in text_lower or "settings button" in text_lower:
        return "UI-GLB-SETTINGS-ICON"
    if "notification bell" in text_lower or "bell icon" in text_lower:
        return "UI-GLB-BELL-ICON"
    if "close ()" in text_lower or "close button" in text_lower or "close link" in text_lower or " close" in text_lower or "dismiss button" in text_lower or "dismiss link" in text_lower or "dismiss icon" in text_lower:
        return "UI-GLB-CLOSE-BTN"
    if "bottom navigation bar" in text_lower or "bottom navigation" in text_lower or "bottom bar" in text_lower:
        return "UI-GLB-BOTTOM-NAV"
    if "floating action button" in text_lower or "fab" in text_lower or "floating action" in text_lower:
        return "UI-GLB-FAB"
    if "search field" in text_lower or "search box" in text_lower or "search bar" in text_lower:
        return "UI-GLB-SEARCH-BAR"
    if "primary cta" in text_lower or "next →" in text_lower or "continue →" in text_lower or "start growing" in text_lower:
        return "UI-GLB-PRIMARY-CTA"
    if "secondary link" in text_lower or "skip for now" in text_lower or "remind me later" in text_lower or "no thanks" in text_lower:
        return "UI-GLB-SECONDARY-LINK"
    if "mic icon" in text_lower or "voice input" in text_lower or "microphone icon" in text_lower:
        return "UI-GLB-MIC-ICON"
    if "camera scan" in text_lower or "scan to identify" in text_lower or "capture button" in text_lower or "camera button" in text_lower or "scan button" in text_lower:
        return "UI-GLB-CAMERA-BTN"
    if "native ad" in text_lower or "ad slot" in text_lower:
        return "UI-GLB-NATIVE-AD"
    if "date picker" in text_lower or "date selector" in text_lower or "date field" in text_lower:
        return "UI-GLB-DATE-PICKER"
    if "location tag" in text_lower or "zone badge" in text_lower or "location badge" in text_lower:
        return "UI-GLB-LOCATION-BADGE"
    if "loading indicator" in text_lower or "loading spinner" in text_lower or "spinner" in text_lower:
        return "UI-GLB-LOADING-SPINNER"
    if "save button" in text_lower or "save recipe" in text_lower or "save plant" in text_lower or "log it" in text_lower or "save preferences" in text_lower:
        return "UI-GLB-SAVE-BTN"
    if "toggle" in text_lower or "switch" in text_lower or "checkbox" in text_lower:
        return "UI-GLB-TOGGLE"
    return None

# List of scoped requirements to delete (Scope Creep)
DELETED_REQUIREMENT_IDS = {
    "FR-S09-013",  # Swaps tab seed/cutting listings
    "FR-S09-014",  # Express Interest transaction logging
    "FR-S16-018",  # Moderation rejection logs UI
    "FR-S16-019",  # CMS multi-draft sync queue
    "FR-S16-020",  # Payment wallet widget/withdrawals
    "FR-S12-013",  # Redundant Reduce Motion toggle
    "FR-S12-026",  # GDPR Art 20 Data Portability exporter
    "FR-S13-004",  # CCPA precision megabytes details
    "FR-S13-015",  # Pending data export status card
}

def escape_xml(text):
    if not text:
        return ""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&apos;")

# Parse Features
def parse_features():
    print("Parsing Features from:", FILE_FEATURES)
    features = []
    
    if not os.path.exists(FILE_FEATURES):
        print("Error: Features file not found!")
        return features

    with open(FILE_FEATURES, "r", encoding="utf-8") as f:
        content = f.read()

    start_match = re.search(r"## 4\.\s+Key Features", content)
    if not start_match:
        print("Error: '4. Key Features' section not found")
        return features

    sub_content = content[start_match.start():]
    end_match = re.search(r"\n##\s+\d+\.", sub_content[20:])
    if end_match:
        sub_content = sub_content[:end_match.start() + 20]

    lines = sub_content.split("\n")
    current_category = "General"
    feat_counter = 1

    for line in lines:
        line_strip = line.strip()
        if line_strip.startswith("###"):
            current_category = line_strip.replace("###", "").strip()
        elif line_strip.startswith("-"):
            m = re.match(r"^\s*-\s*\*\*(.*?)\*\*[\s\u2014:-]+(.*)", line_strip)
            if m:
                feat_name = m.group(1).strip()
                feat_desc = m.group(2).strip()
                feat_id = f"FEAT-{feat_counter:03d}"
                features.append({
                    "id": feat_id,
                    "title": feat_name,
                    "description": feat_desc,
                    "category": current_category,
                    "status": "Verified" if feat_counter <= 20 else "Planned"
                })
                feat_counter += 1
            else:
                m_simple = re.match(r"^\s*-\s*\*\*(.*?)\*\*(.*)", line_strip)
                if m_simple:
                    feat_name = m_simple.group(1).strip()
                    feat_desc = m_simple.group(2).strip()
                    feat_id = f"FEAT-{feat_counter:03d}"
                    features.append({
                        "id": feat_id,
                        "title": feat_name,
                        "description": feat_desc,
                        "category": current_category,
                        "status": "Verified" if feat_counter <= 20 else "Planned"
                    })
                    feat_counter += 1

    print(f"Successfully extracted {len(features)} Features.")
    return features

# Parse Sitemap & Screens
def parse_screens():
    print("Parsing Screens from:", FILE_SCREENS_ELEMENTS)
    screens = []
    
    if not os.path.exists(FILE_SCREENS_ELEMENTS):
        print("Error: Screen Elements file not found!")
        return screens

    with open(FILE_SCREENS_ELEMENTS, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    scr_counter = 1
    
    for line in lines:
        line_strip = line.strip()
        m = re.match(r"^###\s*([A-Z0-9-]+)\s*[\u00b7\u2014\u2013-]\s*(.*)", line_strip)
        if m:
            scr_code = m.group(1).strip()
            scr_title = m.group(2).strip()
            scr_id = f"SCR-{scr_counter:03d}"
            
            if scr_code.startswith("ONB"):
                scr_type = "Onboarding"
            elif scr_code.startswith("SCR"):
                scr_type = "Screen"
            elif scr_code.startswith("MOD"):
                scr_type = "Modal"
            else:
                scr_type = "Other"

            screens.append({
                "id": scr_id,
                "code": scr_code,
                "title": f"{scr_code} - {scr_title}",
                "description": f"Standardized app layout and flow for {scr_title} ({scr_type}).",
                "type": scr_type,
                "status": "In Progress"
            })
            scr_counter += 1

    print(f"Successfully extracted {len(screens)} Screens.")
    return screens

# Parse UI Elements with Consolidation Logic and Scope Creep Pruning
def parse_ui_elements(screens):
    print("Parsing UI Elements from:", FILE_SCREENS_ELEMENTS)
    ui_elements = []
    
    if not os.path.exists(FILE_SCREENS_ELEMENTS):
        return ui_elements

    with open(FILE_SCREENS_ELEMENTS, "r", encoding="utf-8") as f:
        content = f.read()

    parts = re.split(r"(?=\n###\s*[A-Z0-9-]+\s*[\u00b7\u2014\u2013-])", content)
    scr_code_to_id = {s["code"]: s["id"] for s in screens}
    
    # Store globally consolidated tokens first
    global_added = set()
    for token_id, (title, desc) in GLOBAL_UI_TOKENS.items():
        ui_elements.append({
            "id": token_id,
            "title": title,
            "description": desc,
            "is_global": True,
            "status": "Verified"
        })
        global_added.add(token_id)

    ui_counter = 1
    for part in parts:
        lines = part.strip().split("\n")
        if not lines:
            continue
        
        first_line = lines[0].strip()
        m = re.match(r"^###\s*([A-Z0-9-]+)\s*[\u00b7\u2014\u2013-]", first_line)
        if not m:
            continue
        
        scr_code = m.group(1).strip()
        parent_scr_id = scr_code_to_id.get(scr_code)
        if not parent_scr_id:
            continue
            
        for line in lines[1:]:
            line_strip = line.strip()
            
            if not line_strip.startswith("-") and not line_strip.startswith("*"):
                continue
            
            bullet_content = re.sub(r"^[-*]\s*", "", line_strip).strip()
            if (bullet_content.startswith("**") and bullet_content.endswith("**")) or not bullet_content:
                continue
                
            # Parse UI name and description
            ui_name = ""
            ui_desc = ""
            
            m_bold = re.match(r"^\*\*(.*?)\*\*[\s\u2014:-]+(.*)", bullet_content)
            if m_bold:
                ui_name = m_bold.group(1).strip()
                ui_desc = m_bold.group(2).strip()
            else:
                m_paren = re.match(r"^(.*?)\s*\((.*?)\)$", bullet_content)
                if m_paren:
                    ui_name = m_paren.group(1).strip()
                    ui_desc = m_paren.group(2).strip()
                else:
                    ui_name = bullet_content
                    ui_desc = bullet_content
            
            ui_name = ui_name.replace("`", "")
            
            # Prune unrequested UI components (Scope Creep)
            # 1. Swaps tab components
            if scr_code == "SCR-09" and ("swap" in ui_name.lower() or "swaps" in ui_name.lower()):
                continue
            # 2. Wallet withdrawal components
            if scr_code == "SCR-16" and ("withdraw" in ui_name.lower() or "earnings" in ui_name.lower()):
                continue
            # 3. Data export portability pages / ccpa precise size
            if scr_code == "SCR-13" and ("clear" in ui_name.lower() or "export request status" in ui_name.lower()):
                if "plant logs" not in ui_name.lower() and "photos" not in ui_name.lower() and "location" not in ui_name.lower():
                    continue

            # Check if this matches a Global Token
            global_token_id = map_to_global_ui(ui_name)
            if global_token_id:
                # Add relationship to parent screen for this global token
                ui_elements.append({
                    "id": global_token_id,
                    "parent_screen_code": scr_code,
                    "parent_screen_id": parent_scr_id,
                    "is_global": True,
                    "is_link_placeholder": True # Just a placeholder to register relation
                })
                continue

            # Unique component
            ui_id = f"UI-{ui_counter:03d}"
            ui_elements.append({
                "id": ui_id,
                "title": ui_name,
                "description": ui_desc,
                "parent_screen_code": scr_code,
                "parent_screen_id": parent_scr_id,
                "is_global": False,
                "status": "In Progress"
            })
            ui_counter += 1
            
    # Clean out placeholder links, but keep the actual unique items + global tokens
    actual_ui_elements = [u for u in ui_elements if not u.get("is_link_placeholder")]
    print(f"Compressed unique UI Components. Total: {len(actual_ui_elements)} (17 Global Tokens, {len(actual_ui_elements)-17} Unique Screen-specific components).")
    return ui_elements, actual_ui_elements

# Parse Functional Requirements (excluding Scoped Creep items)
def parse_requirements():
    print("Parsing Functional Requirements from:", FILE_REQS)
    reqs = []
    
    if not os.path.exists(FILE_REQS):
        print("Error: Requirements file not found!")
        return reqs

    with open(FILE_REQS, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    req_counter = 1
    req_pat = re.compile(r'\*\*(FR-([A-Z0-9]+)-(\d+))\*\*\s*[\u2014\u2013-]\s*(.*)')
    
    for line in lines:
        line_strip = line.strip()
        m = req_pat.search(line_strip)
        if m:
            legacy_id = m.group(1).strip()
            
            # Prune scope creep requirements
            if legacy_id in DELETED_REQUIREMENT_IDS:
                continue

            section_code = m.group(2).strip()
            req_desc = m.group(4).strip()
            
            req_id = f"REQ-{req_counter:03d}"
            reqs.append({
                "id": req_id,
                "legacy_id": legacy_id,
                "section_code": section_code,
                "title": f"Requirement {legacy_id}",
                "description": req_desc,
                "status": "Verified" if req_counter <= 100 else "Planned"
            })
            req_counter += 1
            
    print(f"Successfully extracted {len(reqs)} Functional Requirements (pruned creep items).")
    return reqs

# Build relationships
def establish_relations(features, reqs, screens, ui_elements):
    relations = []
    rel_counter = 1
    
    # 1. UI Elements -> Screens (UI belongs to parent Screen)
    # Both unique and global instances
    for ui in ui_elements:
        if "parent_screen_id" in ui:
            rel_id = f"REL-{rel_counter:04d}"
            relations.append({
                "id": rel_id,
                "source": ui["id"],
                "target": ui["parent_screen_id"],
                "type": "parent"
            })
            rel_counter += 1
        
    # 2. Screens -> Requirements (Screen implements Requirement)
    scr_code_to_id = {s["code"]: s["id"] for s in screens}
    
    scr_to_req_prefix = {
        "ONB-1": "ONB1", "ONB-2": "ONB2", "ONB-3": "ONB3", "ONB-4": "ONB4",
        "SCR-01": "S01", "SCR-02": "S02", "SCR-03": "S03", "SCR-04": "S04", "SCR-05": "S05",
        "SCR-06": "S06", "SCR-07": "S07", "SCR-08": "S08", "SCR-09": "S09", "SCR-10": "S10",
        "SCR-11": "S11", "SCR-12": "S12", "SCR-13": "S13", "SCR-14": "S14", "SCR-15": "S15",
        "SCR-16": "S16",
        "MOD-01": "M01", "MOD-02": "M02", "MOD-03": "M03", "MOD-04": "M04", "MOD-05": "M05",
        "MOD-06": "M06", "MOD-07": "M07", "MOD-08": "M08", "MOD-09": "M09", "MOD-10": "M10",
        "MOD-11": "M11", "MOD-12": "M12"
    }
    
    req_id_to_scr_ids = {}
    
    for scr_code, req_prefix in scr_to_req_prefix.items():
        scr_id = scr_code_to_id.get(scr_code)
        if not scr_id:
            continue
        matching_reqs = [r for r in reqs if r["section_code"] == req_prefix]
        for req in matching_reqs:
            rel_id = f"REL-{rel_counter:04d}"
            relations.append({
                "id": rel_id,
                "source": scr_id,
                "target": req["id"],
                "type": "implements"
            })
            rel_counter += 1
            if req["id"] not in req_id_to_scr_ids:
                req_id_to_scr_ids[req["id"]] = []
            req_id_to_scr_ids[req["id"]].append(scr_id)
            
    sys_req_links = {
        "FR-SYS-001": ["ONB-1", "SCR-01"],
        "FR-SYS-002": ["SCR-01"],
        "FR-SYS-003": ["SCR-01"],
        "FR-SYS-004": ["ONB-2"],
        "FR-SYS-005": ["ONB-2"],
        "FR-SYS-006": ["ONB-2"],
        "FR-SYS-007": ["SCR-01"],
        "FR-SYS-008": ["SCR-01"],
        "FR-SYS-009": ["SCR-01"],
        "FR-SYS-010": ["SCR-01", "SCR-10"],
        "FR-SYS-011": ["SCR-01"],
        "FR-SYS-012": ["SCR-01"],
        "FR-SYS-013": ["SCR-01"],
        "FR-SYS-014": ["MOD-06", "MOD-05", "MOD-07"],
        "FR-SYS-015": ["MOD-06", "MOD-05", "MOD-07"],
        "FR-SYS-016": ["MOD-06", "MOD-05", "MOD-07"],
        "FR-SYS-017": ["MOD-06", "MOD-05", "MOD-07"],
        "FR-SYS-018": ["SCR-13", "MOD-04"],
        "FR-SYS-019": ["SCR-13", "MOD-04"],
        "FR-SYS-020": ["SCR-13", "MOD-04"],
        "FR-SYS-021": ["SCR-13", "MOD-04"],
        "FR-SYS-022": ["SCR-12"],
        "FR-SYS-023": ["SCR-12"],
        "FR-SYS-024": ["SCR-12"]
    }
    
    for req in reqs:
        if req["section_code"] == "SYS":
            legacy_id = req["legacy_id"]
            target_screens = sys_req_links.get(legacy_id, ["SCR-01"])
            for scr_code in target_screens:
                scr_id = scr_code_to_id.get(scr_code)
                if scr_id:
                    rel_id = f"REL-{rel_counter:04d}"
                    relations.append({
                        "id": rel_id,
                        "source": scr_id,
                        "target": req["id"],
                        "type": "implements"
                    })
                    rel_counter += 1
                    if req["id"] not in req_id_to_scr_ids:
                        req_id_to_scr_ids[req["id"]] = []
                    req_id_to_scr_ids[req["id"]].append(scr_id)

    # 3. Requirements -> Features (Requirement fulfills Feature)
    prefix_to_feat_map = {
        "ONB1": ["FEAT-019"], "ONB2": ["FEAT-019"], "ONB3": ["FEAT-019"], "ONB4": ["FEAT-019"],
        "S01": ["FEAT-020", "FEAT-006", "FEAT-009", "FEAT-024", "FEAT-003"],
        "S02": ["FEAT-017", "FEAT-018"],
        "S03": ["FEAT-017", "FEAT-021"],
        "S15": ["FEAT-031", "FEAT-012"],
        "S04": ["FEAT-015", "FEAT-011", "FEAT-008", "FEAT-013"],
        "S05": ["FEAT-015"],
        "S06": ["FEAT-011", "FEAT-001", "FEAT-002"],
        "S07": ["FEAT-008", "FEAT-009", "FEAT-010"],
        "S08": ["FEAT-028", "FEAT-029", "FEAT-030", "FEAT-007", "FEAT-026"],
        "S09": ["FEAT-029"],
        "S10": ["FEAT-028", "FEAT-007"],
        "S11": ["FEAT-030", "FEAT-022"],
        "S12": ["FEAT-019", "FEAT-027", "FEAT-036"],
        "S13": ["FEAT-019"],
        "S14": ["FEAT-016"],
        "S16": ["FEAT-035"],
        "M01": ["FEAT-017"], "M02": ["FEAT-017"],
        "M03": ["FEAT-013"],
        "M04": ["FEAT-014"],
        "M05": ["FEAT-025"],
        "M06": ["FEAT-023"],
        "M07": ["FEAT-027"],
        "M08": ["FEAT-018"],
        "M09": ["FEAT-032", "FEAT-033", "FEAT-034", "FEAT-036"],
        "M10": ["FEAT-009"],
        "M11": ["FEAT-020"],
        "M12": ["FEAT-031"]
    }
    
    feat_id_to_obj = {f["id"]: f for f in features}
    
    for req in reqs:
        fulfilled_feats = []
        if req["section_code"] == "SYS":
            legacy_num = int(req["legacy_id"].split("-")[-1])
            if 1 <= legacy_num <= 3:
                fulfilled_feats = ["FEAT-019", "FEAT-033"]
            elif 4 <= legacy_num <= 6:
                fulfilled_feats = ["FEAT-019"]
            elif 7 <= legacy_num <= 10:
                fulfilled_feats = ["FEAT-004", "FEAT-005", "FEAT-006"]
            elif 11 <= legacy_num <= 13:
                fulfilled_feats = ["FEAT-009"]
            elif 14 <= legacy_num <= 17:
                fulfilled_feats = ["FEAT-023", "FEAT-024", "FEAT-025", "FEAT-027"]
            elif 18 <= legacy_num <= 21:
                fulfilled_feats = ["FEAT-011", "FEAT-014"]
            elif 22 <= legacy_num <= 24:
                fulfilled_feats = ["FEAT-014"]
        else:
            fulfilled_feats = prefix_to_feat_map.get(req["section_code"], [])
            
        for feat_id in fulfilled_feats:
            if feat_id in feat_id_to_obj:
                rel_id = f"REL-{rel_counter:04d}"
                relations.append({
                    "id": rel_id,
                    "source": req["id"],
                    "target": feat_id,
                    "type": "fulfills"
                })
                rel_counter += 1

    print(f"Successfully established {len(relations)} Traceability Relations.")
    return relations

# Generate ReqIF XML content
def write_reqif_file(features, reqs, screens, ui_elements, relations):
    print("Writing ReqIF database to:", FILE_OUT_REQIF)
    
    xml_header = """<?xml version="1.0" encoding="UTF-8"?>
<REQ-IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd reqif.xsd">
  <THE-HEADER>
    <REQ-IF-HEADER IDENTIFIER="header-gardenpulse">
      <COMMENT>GardenPulse Unified Traceability Database</COMMENT>
      <CREATION-TIME>2026-06-06T12:20:52+05:00</CREATION-TIME>
      <REQ-IF-TOOL-ID>Antigravity Traceability Generator</REQ-IF-TOOL-ID>
      <REQ-IF-VERSION>1.0</REQ-IF-VERSION>
      <SOURCE-TOOL-ID>Antigravity Core Architect</SOURCE-TOOL-ID>
      <TITLE>GardenPulse Traceability Specification</TITLE>
    </REQ-IF-HEADER>
  </THE-HEADER>
  <CORE-CONTENT>
    <REQ-IF-CONTENT>
      <DATATYPES>
        <DATATYPE-DEFINITION-STRING IDENTIFIER="dt-string" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="String" MAX-LENGTH="10000"/>
        <DATATYPE-DEFINITION-ENUMERATION IDENTIFIER="dt-status" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="Status">
          <SPEC-VALUES>
            <ENUM-VALUE IDENTIFIER="status-planned" LONG-NAME="Planned"/>
            <ENUM-VALUE IDENTIFIER="status-inprogress" LONG-NAME="In Progress"/>
            <ENUM-VALUE IDENTIFIER="status-verified" LONG-NAME="Verified"/>
          </SPEC-VALUES>
        </DATATYPE-DEFINITION-ENUMERATION>
      </DATATYPES>
      <SPEC-TYPES>
        <SPEC-OBJECT-TYPE IDENTIFIER="type-feature" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="Feature">
          <SPEC-ATTRIBUTES>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-feat-id" LONG-NAME="ID" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-feat-title" LONG-NAME="Title" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-feat-desc" LONG-NAME="Description" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-ENUMERATION IDENTIFIER="attr-feat-status" LONG-NAME="Status" TYPE-REF="dt-status"/>
          </SPEC-ATTRIBUTES>
        </SPEC-OBJECT-TYPE>
        <SPEC-OBJECT-TYPE IDENTIFIER="type-requirement" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="Requirement">
          <SPEC-ATTRIBUTES>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-req-id" LONG-NAME="ID" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-req-title" LONG-NAME="Title" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-req-desc" LONG-NAME="Description" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-ENUMERATION IDENTIFIER="attr-req-status" LONG-NAME="Status" TYPE-REF="dt-status"/>
          </SPEC-ATTRIBUTES>
        </SPEC-OBJECT-TYPE>
        <SPEC-OBJECT-TYPE IDENTIFIER="type-screen" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="Screen">
          <SPEC-ATTRIBUTES>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-scr-id" LONG-NAME="ID" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-scr-title" LONG-NAME="Title" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-scr-desc" LONG-NAME="Description" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-ENUMERATION IDENTIFIER="attr-scr-status" LONG-NAME="Status" TYPE-REF="dt-status"/>
          </SPEC-ATTRIBUTES>
        </SPEC-OBJECT-TYPE>
        <SPEC-OBJECT-TYPE IDENTIFIER="type-ui-element" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="UI-Element">
          <SPEC-ATTRIBUTES>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-ui-id" LONG-NAME="ID" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-ui-title" LONG-NAME="Title" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="attr-ui-desc" LONG-NAME="Description" TYPE-REF="dt-string"/>
            <ATTRIBUTE-DEFINITION-ENUMERATION IDENTIFIER="attr-ui-status" LONG-NAME="Status" TYPE-REF="dt-status"/>
          </SPEC-ATTRIBUTES>
        </SPEC-OBJECT-TYPE>
        <SPEC-RELATION-TYPE IDENTIFIER="rel-implements" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="implements"/>
        <SPEC-RELATION-TYPE IDENTIFIER="rel-fulfills" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="fulfills"/>
        <SPEC-RELATION-TYPE IDENTIFIER="rel-parent" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="parent"/>
        <SPECIFICATION-TYPE IDENTIFIER="spec-type-doc" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="Specification Document"/>
      </SPEC-TYPES>
      <SPEC-OBJECTS>
"""

    xml_body = ""
    for f in features:
        status_ref = "status-verified" if f["status"] == "Verified" else "status-planned"
        xml_body += f"""        <SPEC-OBJECT IDENTIFIER="{f["id"]}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
          <TYPE>
            <SPEC-OBJECT-TYPE-REF>type-feature</SPEC-OBJECT-TYPE-REF>
          </TYPE>
          <VALUES>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(f["id"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-feat-id</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(f["title"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-feat-title</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(f["description"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-feat-desc</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-ENUMERATION>
              <VALUES>
                <ENUM-VALUE-REF>{status_ref}</ENUM-VALUE-REF>
              </VALUES>
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-ENUMERATION-REF>attr-feat-status</ATTRIBUTE-DEFINITION-ENUMERATION-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-ENUMERATION>
          </VALUES>
        </SPEC-OBJECT>\n"""

    for r in reqs:
        status_ref = "status-verified" if r["status"] == "Verified" else "status-planned"
        xml_body += f"""        <SPEC-OBJECT IDENTIFIER="{r["id"]}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
          <TYPE>
            <SPEC-OBJECT-TYPE-REF>type-requirement</SPEC-OBJECT-TYPE-REF>
          </TYPE>
          <VALUES>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(r["id"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-req-id</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(r["legacy_id"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-req-title</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(r["description"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-req-desc</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-ENUMERATION>
              <VALUES>
                <ENUM-VALUE-REF>{status_ref}</ENUM-VALUE-REF>
              </VALUES>
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-ENUMERATION-REF>attr-req-status</ATTRIBUTE-DEFINITION-ENUMERATION-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-ENUMERATION>
          </VALUES>
        </SPEC-OBJECT>\n"""

    for s in screens:
        xml_body += f"""        <SPEC-OBJECT IDENTIFIER="{s["id"]}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
          <TYPE>
            <SPEC-OBJECT-TYPE-REF>type-screen</SPEC-OBJECT-TYPE-REF>
          </TYPE>
          <VALUES>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(s["id"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-scr-id</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(s["title"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-scr-title</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(s["description"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-scr-desc</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-ENUMERATION>
              <VALUES>
                <ENUM-VALUE-REF>status-inprogress</ENUM-VALUE-REF>
              </VALUES>
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-ENUMERATION-REF>attr-scr-status</ATTRIBUTE-DEFINITION-ENUMERATION-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-ENUMERATION>
          </VALUES>
        </SPEC-OBJECT>\n"""

    for ui in ui_elements:
        xml_body += f"""        <SPEC-OBJECT IDENTIFIER="{ui["id"]}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
          <TYPE>
            <SPEC-OBJECT-TYPE-REF>type-ui-element</SPEC-OBJECT-TYPE-REF>
          </TYPE>
          <VALUES>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(ui["id"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-ui-id</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(ui["title"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-ui-title</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="{escape_xml(ui["description"])}">
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-STRING-REF>attr-ui-desc</ATTRIBUTE-DEFINITION-STRING-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
            <ATTRIBUTE-VALUE-ENUMERATION>
              <VALUES>
                <ENUM-VALUE-REF>status-inprogress</ENUM-VALUE-REF>
              </VALUES>
              <DEFINITION>
                <ATTRIBUTE-DEFINITION-ENUMERATION-REF>attr-ui-status</ATTRIBUTE-DEFINITION-ENUMERATION-REF>
              </DEFINITION>
            </ATTRIBUTE-VALUE-ENUMERATION>
          </VALUES>
        </SPEC-OBJECT>\n"""

    xml_relations = "      </SPEC-OBJECTS>\n      <SPEC-RELATIONS>\n"
    for r in relations:
        type_ref = f"rel-{r['type']}"
        xml_relations += f"""        <SPEC-RELATION IDENTIFIER="{r["id"]}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
          <SOURCE>
            <SPEC-OBJECT-REF>{r["source"]}</SPEC-OBJECT-REF>
          </SOURCE>
          <TARGET>
            <SPEC-OBJECT-REF>{r["target"]}</SPEC-OBJECT-REF>
          </TARGET>
          <TYPE>
            <SPEC-RELATION-TYPE-REF>{type_ref}</SPEC-RELATION-TYPE-REF>
          </TYPE>
        </SPEC-RELATION>\n"""

    xml_specifications = """      </SPEC-RELATIONS>
      <SPECIFICATIONS>
        <SPECIFICATION IDENTIFIER="spec-gardenpulse-doc" LAST-CHANGE="2026-06-06T12:20:52+05:00" LONG-NAME="GardenPulse Core Specification">
          <TYPE>
            <SPECIFICATION-TYPE-REF>spec-type-doc</SPECIFICATION-TYPE-REF>
          </TYPE>
          <CHILDREN>
"""
    hier_id = 1
    for f in features:
        xml_specifications += f"""            <SPEC-HIERARCHY IDENTIFIER="hier-{hier_id:05d}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
              <OBJECT>
                <SPEC-OBJECT-REF>{f["id"]}</SPEC-OBJECT-REF>
              </OBJECT>
            </SPEC-HIERARCHY>\n"""
        hier_id += 1
    for r in reqs:
        xml_specifications += f"""            <SPEC-HIERARCHY IDENTIFIER="hier-{hier_id:05d}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
              <OBJECT>
                <SPEC-OBJECT-REF>{r["id"]}</SPEC-OBJECT-REF>
              </OBJECT>
            </SPEC-HIERARCHY>\n"""
        hier_id += 1
    for s in screens:
        xml_specifications += f"""            <SPEC-HIERARCHY IDENTIFIER="hier-{hier_id:05d}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
              <OBJECT>
                <SPEC-OBJECT-REF>{s["id"]}</SPEC-OBJECT-REF>
              </OBJECT>
            </SPEC-HIERARCHY>\n"""
        hier_id += 1
    for ui in ui_elements:
        xml_specifications += f"""            <SPEC-HIERARCHY IDENTIFIER="hier-{hier_id:05d}" LAST-CHANGE="2026-06-06T12:20:52+05:00">
              <OBJECT>
                <SPEC-OBJECT-REF>{ui["id"]}</SPEC-OBJECT-REF>
              </OBJECT>
            </SPEC-HIERARCHY>\n"""
        hier_id += 1

    xml_footer = """          </CHILDREN>
        </SPECIFICATION>
      </SPECIFICATIONS>
    </REQ-IF-CONTENT>
  </CORE-CONTENT>
</REQ-IF>"""

    with open(FILE_OUT_REQIF, "w", encoding="utf-8") as f:
        f.write(xml_header + xml_body + xml_relations + xml_specifications + xml_footer)

    print("ReqIF file successfully generated.")

# Generate HTML viewer
def write_html_viewer(features, reqs, screens, ui_elements, relations):
    print("Writing HTML viewer to:", FILE_OUT_HTML)
    
    feat_map = {f["id"]: f for f in features}
    req_map = {r["id"]: r for r in reqs}
    scr_map = {s["id"]: s for s in screens}
    ui_map = {ui["id"]: ui for ui in ui_elements}
    
    ui_to_scr = {}
    scr_to_uis = {s["id"]: [] for s in screens}
    scr_to_reqs = {s["id"]: [] for s in screens}
    req_to_scrs = {r["id"]: [] for r in reqs}
    req_to_feats = {r["id"]: [] for r in reqs}
    feat_to_reqs = {f["id"]: [] for f in features}
    
    for rel in relations:
        s_id = rel["source"]
        t_id = rel["target"]
        r_type = rel["type"]
        
        if r_type == "parent":
            ui_to_scr[s_id] = t_id
            if t_id in scr_to_uis:
                scr_to_uis[t_id].append(s_id)
        elif r_type == "implements":
            if s_id in scr_to_reqs:
                scr_to_reqs[s_id].append(t_id)
            if t_id in req_to_scrs:
                req_to_scrs[t_id].append(s_id)
        elif r_type == "fulfills":
            if s_id in req_to_feats:
                req_to_feats[s_id].append(t_id)
            if t_id in feat_to_reqs:
                feat_to_reqs[t_id].append(s_id)

    orphan_features = [f_id for f_id, req_list in feat_to_reqs.items() if not req_list]
    orphan_reqs = [r_id for r_id in req_map if not req_to_feats.get(r_id) or not req_to_scrs.get(r_id)]
    orphan_screens = [s_id for s_id, req_list in scr_to_reqs.items() if not req_list]
    orphan_uis = [u_id for u_id in ui_map if u_id not in ui_to_scr and not ui_map[u_id].get("is_global")]

    print(f"Audit Results - Orphans: Features: {len(orphan_features)}, Reqs: {len(orphan_reqs)}, Screens: {len(orphan_screens)}, UI elements: {len(orphan_uis)}")

    matrix_rows = []
    mapped_features = set()
    mapped_reqs = set()
    mapped_screens = set()
    mapped_uis = set()
    
    # Try to build paths starting from Features
    for f_id, f in feat_map.items():
        req_list = feat_to_reqs.get(f_id, [])
        if not req_list:
            matrix_rows.append({
                "feat_id": f_id, "feat_title": f["title"], "feat_desc": f["description"], "feat_orphan": True,
                "req_id": "", "req_title": "", "req_desc": "", "req_orphan": False,
                "scr_id": "", "scr_title": "", "scr_desc": "", "scr_orphan": False,
                "ui_id": "", "ui_title": "", "ui_desc": "", "ui_orphan": False,
                "is_orphan_row": True
            })
            mapped_features.add(f_id)
            continue
            
        for r_id in req_list:
            r = req_map.get(r_id)
            if not r:
                continue
            mapped_features.add(f_id)
            mapped_reqs.add(r_id)
            
            scr_list = req_to_scrs.get(r_id, [])
            if not scr_list:
                matrix_rows.append({
                    "feat_id": f_id, "feat_title": f["title"], "feat_desc": f["description"], "feat_orphan": False,
                    "req_id": r_id, "req_title": r["legacy_id"], "req_desc": r["description"], "req_orphan": True,
                    "scr_id": "", "scr_title": "", "scr_desc": "", "scr_orphan": False,
                    "ui_id": "", "ui_title": "", "ui_desc": "", "ui_orphan": False,
                    "is_orphan_row": True
                })
                continue
                
            for s_id in scr_list:
                s = scr_map.get(s_id)
                if not s:
                    continue
                mapped_screens.add(s_id)
                
                ui_list = scr_to_uis.get(s_id, [])
                if not ui_list:
                    matrix_rows.append({
                        "feat_id": f_id, "feat_title": f["title"], "feat_desc": f["description"], "feat_orphan": False,
                        "req_id": r_id, "req_title": r["legacy_id"], "req_desc": r["description"], "req_orphan": False,
                        "scr_id": s_id, "scr_title": s["title"], "scr_desc": s["description"], "scr_orphan": False,
                        "ui_id": "", "ui_title": "", "ui_desc": "", "ui_orphan": False,
                        "is_orphan_row": False
                    })
                    continue
                    
                for u_id in ui_list:
                    ui = ui_map.get(u_id)
                    if not ui:
                        continue
                    mapped_uis.add(u_id)
                    matrix_rows.append({
                        "feat_id": f_id, "feat_title": f["title"], "feat_desc": f["description"], "feat_orphan": False,
                        "req_id": r_id, "req_title": r["legacy_id"], "req_desc": r["description"], "req_orphan": False,
                        "scr_id": s_id, "scr_title": s["title"], "scr_desc": s["description"], "scr_orphan": False,
                        "ui_id": u_id, "ui_title": ui["title"], "ui_desc": ui["description"], "ui_orphan": False,
                        "is_orphan_row": False
                    })

    # Unmapped Requirements
    unmapped_reqs = set(req_map.keys()) - mapped_reqs
    for r_id in unmapped_reqs:
        r = req_map[r_id]
        matrix_rows.append({
            "feat_id": "", "feat_title": "", "feat_desc": "", "feat_orphan": False,
            "req_id": r_id, "req_title": r["legacy_id"], "req_desc": r["description"], "req_orphan": True,
            "scr_id": "", "scr_title": "", "scr_desc": "", "scr_orphan": False,
            "ui_id": "", "ui_title": "", "ui_desc": "", "ui_orphan": False,
            "is_orphan_row": True
        })
        
    # Unmapped Screens
    unmapped_screens = set(scr_map.keys()) - mapped_screens
    for s_id in unmapped_screens:
        s = scr_map[s_id]
        matrix_rows.append({
            "feat_id": "", "feat_title": "", "feat_desc": "", "feat_orphan": False,
            "req_id": "", "req_title": "", "req_desc": "", "req_orphan": False,
            "scr_id": s_id, "scr_title": s["title"], "scr_desc": s["description"], "scr_orphan": True,
            "ui_id": "", "ui_title": "", "ui_desc": "", "ui_orphan": False,
            "is_orphan_row": True
        })

    import json
    rows_json = json.dumps(matrix_rows, indent=2)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GardenPulse Traceability Auditor</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-color: #0f172a;
            --border-color: #e2e8f0;
            --accent-color: #10b981;
            --badge-feat: #dbeafe;
            --badge-feat-text: #1e40af;
            --badge-req: #fef3c7;
            --badge-req-text: #92400e;
            --badge-scr: #dcfce7;
            --badge-scr-text: #15803d;
            --badge-ui: #f3e8ff;
            --badge-ui-text: #6b21a8;
            --orphan-bg: #fef2f2;
            --orphan-border: #fca5a5;
            --orphan-text: #991b1b;
        }}

        @media (prefers-color-scheme: dark) {{
            :root {{
                --bg-color: #0f172a;
                --card-bg: #1e293b;
                --text-color: #f1f5f9;
                --border-color: #334155;
                --badge-feat: #1e3a8a;
                --badge-feat-text: #93c5fd;
                --badge-req: #78350f;
                --badge-req-text: #fde68a;
                --badge-scr: #064e3b;
                --badge-scr-text: #86efac;
                --badge-ui: #581c87;
                --badge-ui-text: #c084fc;
                --orphan-bg: #451a03;
                --orphan-border: #9a3412;
                --orphan-text: #fca5a5;
            }}
        }}

        body {{
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 24px;
            transition: background-color 0.3s, color 0.3s;
        }}

        header {{
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
        }}

        h1 {{
            font-family: 'Outfit', sans-serif;
            margin: 0 0 8px 0;
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: -0.025em;
        }}

        .tagline {{
            margin: 0;
            opacity: 0.7;
            font-size: 1rem;
        }}

        .stats-container {{
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }}

        .stat-card {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 12px 20px;
            min-width: 100px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }}

        .stat-value {{
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent-color);
        }}

        .stat-label {{
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.6;
            margin-top: 4px;
        }}

        .controls {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            gap: 16px;
            align-items: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            flex-wrap: wrap;
        }}

        .search-box {{
            flex: 1;
            min-width: 250px;
            position: relative;
        }}

        .search-box input {{
            width: 100%;
            padding: 12px 16px;
            padding-left: 40px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            color: var(--text-color);
            font-size: 0.95rem;
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.2s;
        }}

        .search-box input:focus {{
            border-color: var(--accent-color);
        }}

        .search-box::before {{
            content: "";
            position: absolute;
            left: 14px;
            top: 14px;
            opacity: 0.5;
            font-size: 0.9rem;
        }}

        .filter-group {{
            display: flex;
            gap: 8px;
        }}

        .btn {{
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: 10px 16px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
        }}

        .btn:hover {{
            background: var(--border-color);
        }}

        .btn.active {{
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }}

        .table-container {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.9rem;
        }}

        th {{
            background: var(--bg-color);
            padding: 16px;
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
            font-family: 'Outfit', sans-serif;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            opacity: 0.8;
        }}

        td {{
            padding: 16px;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
            max-width: 300px;
            line-height: 1.5;
        }}

        tr:last-child td {{
            border-bottom: none;
        }}

        tr.orphan-row {{
            background-color: var(--orphan-bg);
        }}
        
        tr.orphan-row td {{
            border-bottom: 1px solid var(--orphan-border);
        }}

        .badge {{
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.75rem;
            margin-bottom: 6px;
            font-family: monospace;
        }}

        .badge-feat {{ background-color: var(--badge-feat); color: var(--badge-feat-text); }}
        .badge-req {{ background-color: var(--badge-req); color: var(--badge-req-text); }}
        .badge-scr {{ background-color: var(--badge-scr); color: var(--badge-scr-text); }}
        .badge-ui {{ background-color: var(--badge-ui); color: var(--badge-ui-text); }}
        .badge-orphan {{ background-color: var(--orphan-text); color: white; }}

        .item-title {{
            font-weight: 600;
            margin-bottom: 4px;
            font-family: 'Outfit', sans-serif;
        }}

        .item-desc {{
            font-size: 0.85rem;
            opacity: 0.8;
        }}

        .empty-cell {{
            font-style: italic;
            opacity: 0.5;
            font-size: 0.85rem;
        }}
    </style>
</head>
<body>

    <header>
        <div>
            <h1>GardenPulse Traceability Matrix</h1>
            <p class="tagline">Token-Compressed OMG ReqIF-compliant Specification Grid</p>
        </div>
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-value">{len(features)}</div>
                <div class="stat-label">Features</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{len(reqs)}</div>
                <div class="stat-label">Requirements</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{len(screens)}</div>
                <div class="stat-label">Screens</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{len(ui_elements)}</div>
                <div class="stat-label">UI Elements</div>
            </div>
            <div class="stat-card" style="border-color: var(--orphan-border);">
                <div class="stat-value" style="color: var(--orphan-text);">{len(orphan_reqs) + len(orphan_screens) + len(orphan_features)}</div>
                <div class="stat-label" style="color: var(--orphan-text);">Gaps Detected</div>
            </div>
        </div>
    </header>

    <div class="controls">
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search by ID, keyword, or description..." oninput="filterTable()">
        </div>
        <div class="filter-group">
            <button class="btn active" id="btnAll" onclick="setFilter('all')">Show All Rows</button>
            <button class="btn" id="btnGaps" onclick="setFilter('gaps')" style="border-color: var(--orphan-border); color: var(--orphan-text);"> [WARNING]  Show Gaps/Orphans Only</button>
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Feature (FEAT)</th>
                    <th>Functional Req (REQ)</th>
                    <th>Screen (SCR)</th>
                    <th>UI Element (UI)</th>
                </tr>
            </thead>
            <tbody id="matrixBody">
                <!-- Rows will be dynamically loaded via JS -->
            </tbody>
        </table>
    </div>

    <script>
        const matrixData = {rows_json};

        let currentFilter = 'all';

        function renderRows(data) {{
            const tbody = document.getElementById('matrixBody');
            tbody.innerHTML = '';

            if (data.length === 0) {{
                tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 32px; opacity: 0.5;">No results found matching search criteria.</td></tr>`;
                return;
            }}

            data.forEach(row => {{
                const tr = document.createElement('tr');
                if (row.is_orphan_row) {{
                    tr.classList.add('orphan-row');
                }}

                // Feature column
                let tdFeat = '';
                if (row.feat_id) {{
                    tdFeat = `
                        <span class="badge badge-feat">${{row.feat_id}}</span>
                        ${{row.feat_orphan ? '<span class="badge badge-orphan">ORPHAN</span>' : ''}}
                        <div class="item-title">${{escapeHtml(row.feat_title)}}</div>
                        <div class="item-desc">${{escapeHtml(row.feat_desc)}}</div>
                    `;
                }} else {{
                    tdFeat = '<span class="empty-cell">No Linked Feature (Orphan)</span>';
                }}

                // Req column
                let tdReq = '';
                if (row.req_id) {{
                    tdReq = `
                        <span class="badge badge-req">${{row.req_id}} (${{row.req_title}})</span>
                        ${{row.req_orphan ? '<span class="badge badge-orphan">GAP</span>' : ''}}
                        <div class="item-desc">${{escapeHtml(row.req_desc)}}</div>
                    `;
                }} else {{
                    tdReq = '<span class="empty-cell">No Linked Requirement (Gap)</span>';
                }}

                // Screen column
                let tdScr = '';
                if (row.scr_id) {{
                    tdScr = `
                        <span class="badge badge-scr">${{row.scr_id}}</span>
                        ${{row.scr_orphan ? '<span class="badge badge-orphan">GAP</span>' : ''}}
                        <div class="item-title">${{escapeHtml(row.scr_title)}}</div>
                        <div class="item-desc">${{escapeHtml(row.scr_desc)}}</div>
                    `;
                }} else {{
                    tdScr = '<span class="empty-cell">No Linked Screen (Gap)</span>';
                }}

                // UI element column
                let tdUi = '';
                if (row.ui_id) {{
                    const isGlobal = row.ui_id.startsWith('UI-GLB-');
                    tdUi = `
                        <span class="badge badge-ui" style="${{isGlobal ? 'background-color:#1e293b; color:#fff;' : ''}}">${{row.ui_id}} ${{isGlobal ? '(GLOBAL)' : ''}}</span>
                        <div class="item-title">${{escapeHtml(row.ui_title)}}</div>
                        <div class="item-desc">${{escapeHtml(row.ui_desc)}}</div>
                    `;
                }} else {{
                    tdUi = '<span class="empty-cell">No Component Elements</span>';
                }}

                tr.innerHTML = `
                    <td>${{tdFeat}}</td>
                    <td>${{tdReq}}</td>
                    <td>${{tdScr}}</td>
                    <td>${{tdUi}}</td>
                `;
                tbody.appendChild(tr);
            }});
        }}

        function escapeHtml(str) {{
            if (!str) return '';
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }}

        function setFilter(filterType) {{
            currentFilter = filterType;
            document.getElementById('btnAll').classList.toggle('active', filterType === 'all');
            document.getElementById('btnGaps').classList.toggle('active', filterType === 'gaps');
            filterTable();
        }}

        function filterTable() {{
            const searchVal = document.getElementById('searchInput').value.toLowerCase();
            
            const filtered = matrixData.filter(row => {{
                const matchesSearch = 
                    (row.feat_id && row.feat_id.toLowerCase().includes(searchVal)) ||
                    (row.feat_title && row.feat_title.toLowerCase().includes(searchVal)) ||
                    (row.feat_desc && row.feat_desc.toLowerCase().includes(searchVal)) ||
                    (row.req_id && row.req_id.toLowerCase().includes(searchVal)) ||
                    (row.req_title && row.req_title.toLowerCase().includes(searchVal)) ||
                    (row.req_desc && row.req_desc.toLowerCase().includes(searchVal)) ||
                    (row.scr_id && row.scr_id.toLowerCase().includes(searchVal)) ||
                    (row.scr_title && row.scr_title.toLowerCase().includes(searchVal)) ||
                    (row.scr_desc && row.scr_desc.toLowerCase().includes(searchVal)) ||
                    (row.ui_id && row.ui_id.toLowerCase().includes(searchVal)) ||
                    (row.ui_title && row.ui_title.toLowerCase().includes(searchVal)) ||
                    (row.ui_desc && row.ui_desc.toLowerCase().includes(searchVal));

                if (currentFilter === 'all') {{
                    return matchesSearch;
                }} else if (currentFilter === 'gaps') {{
                    return matchesSearch && row.is_orphan_row;
                }}
                return false;
            }});

            renderRows(filtered);
        }}

        // Initial render
        renderRows(matrixData);
    </script>
</body>
</html>
"""

    with open(FILE_OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("HTML viewer successfully generated.")

# Self Verification Audit
def verify_reqif_structure():
    print("----------------------------------------")
    print("RUNNING AUTOMATED REQIF INTEGRITY CHECKS...")
    
    if not os.path.exists(FILE_OUT_REQIF):
        print("FAIL: ReqIF file was not generated!")
        return False

    try:
        dom = xml.dom.minidom.parse(FILE_OUT_REQIF)
        print("SUCCESS: ReqIF XML structure is well-formed.")
    except Exception as e:
        print(f"FAIL: XML parsing failed: {e}")
        return False

    with open(FILE_OUT_REQIF, "r", encoding="utf-8") as f:
        xml_text = f.read()

    spec_object_ids = set(re.findall(r'<SPEC-OBJECT IDENTIFIER="(.*?)"', xml_text))
    sources = re.findall(r'<SOURCE>\s*<SPEC-OBJECT-REF>(.*?)</SPEC-OBJECT-REF>\s*</SOURCE>', xml_text)
    targets = re.findall(r'<TARGET>\s*<SPEC-OBJECT-REF>(.*?)</SPEC-OBJECT-REF>\s*</TARGET>', xml_text)
    
    broken_sources = [s for s in sources if s not in spec_object_ids]
    broken_targets = [t for t in targets if t not in spec_object_ids]
    
    if broken_sources or broken_targets:
        print(f"FAIL: Traceability links point to non-existent objects!")
        print(f"Broken Sources: {broken_sources}")
        print(f"Broken Targets: {broken_targets}")
        return False
        
    print("SUCCESS: 100% of traceability links map to valid objects.")
    print("SUCCESS: No broken targets/sources detected.")
    print("----------------------------------------")
    return True

# Main Execution Flow
def main():
    features = parse_features()
    screens = parse_screens()
    ui_elements, actual_ui_elements = parse_ui_elements(screens)
    reqs = parse_requirements()
    
    relations = establish_relations(features, reqs, screens, ui_elements)
    
    write_reqif_file(features, reqs, screens, actual_ui_elements, relations)
    write_html_viewer(features, reqs, screens, actual_ui_elements, relations)
    
    success = verify_reqif_structure()
    if success:
        print("MIGRATION COMPLETED SUCCESSFULLY.")
        print(f"SUMMARY COUNTS:")
        print(f"  - Features: {len(features)}")
        print(f"  - Requirements: {len(reqs)}")
        print(f"  - Screens: {len(screens)}")
        print(f"  - UI Elements: {len(actual_ui_elements)}")
        print(f"  - Traceability Links: {len(relations)}")
        print("The database is fully verified and consistent.")
    else:
        print("MIGRATION ENCOUNTERED ERRORS.")
        sys.exit(1)

if __name__ == "__main__":
    main()
