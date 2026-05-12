import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../api/settings_api";

/* ================= HELPERS ================= */
const getSliderBg = (value) => {
  let color =
    value < 25
      ? "#9F3A2C"
      : value < 50
      ? "#F59E0B"
      : value < 75
      ? "#2563EB"
      : "#16A34A";

  return {
    background: `linear-gradient(to left,${color} ${value}%,#E5E7EB ${value}%)`,
  };
};

/* ================= MAIN ================= */

export default function SettingsPage() {

  const { t, i18n } = useTranslation();

  /* ================= STATE ================= */

  const [categories, setCategories] = useState([]);

  const [priorities, setPriorities] = useState([]);

  const [sla, setSla] = useState({});

  const [overtime, setOvertime] = useState({
    alert: true,
    reassign: false,
  });

  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    update: false,
    assign: true,
  });

  const [ai, setAi] = useState(20);

  /* ================= MODAL ================= */

  const [showModal, setShowModal] =
    useState(false);

  const [departmentName, setDepartmentName] =
    useState("");

  const [departmentLogo, setDepartmentLogo] =
    useState(null);

  const [editData, setEditData] =
    useState(null);

  /* ================= FETCH ================= */

  const fetchDepartments = async () => {

    try {

      const data = await getDepartments();

      const departments = data.departments.map(
        (d) => ({
          id: d.id,
          name: d.Name,
          logo: d.Logo,
          hidden: false,
        })
      );

      setCategories(departments);

      setPriorities(
        departments.map((d) => d.name)
      );

      const slaObject = {};

      departments.forEach((d) => {

        slaObject[d.name] = {
          hours: 1,
          days: 1,
        };
      });

      setSla(slaObject);

    } catch (err) {

      console.error(
        "Settings error",
        err
      );
    }
  };

  useEffect(() => {

  const loadData = async () => {

    await fetchDepartments();
  };

  loadData();

}, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

  try {

    await deleteDepartment(id);

    setCategories((p) =>
      p.filter((c) => c.id !== id)
    );

    alert(
      "Department deleted successfully."
    );

  } catch (err) {

    console.log(
      err.response?.data
    );

    // BACKEND MESSAGE
    if (
      err.response?.data?.message
    ) {

      alert(
        err.response.data.message
      );

    } else {

      alert(
        "Delete failed."
      );
    }

    console.error(
      "Delete error",
      err
    );
  }
};

  /* ================= SAVE ================= */

  const handleSaveDepartment =
    async () => {

      try {

        if (!departmentName.trim())
          return;

        const formData =
          new FormData();

        formData.append(
          "Name",
          departmentName
        );

        if (departmentLogo) {

          formData.append(
            "Logo",
            departmentLogo
          );
        }

        // CREATE
        if (!editData) {

          await createDepartment(
            formData
          );

        } else {

          // UPDATE
          await updateDepartment(
            editData.id,
            formData
          );
        }

        await fetchDepartments();

        setShowModal(false);

        setDepartmentName("");

        setDepartmentLogo(null);

        setEditData(null);

      } catch (err) {

        console.error(
          "Department error",
          err
        );
      }
    };

  return (

    <div
      dir={
        i18n.language === "ar"
          ? "rtl"
          : "ltr"
      }
      className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-3 text-sm"
    >

      {/* TITLE */}
      <h2 className="font-bold mb-4 -mt-3">
        {t("incidentRules")}

        <span className="text-xs">
          {" "}
          (Incident Rules Management)
        </span>
      </h2>

      <div className="flex-1 overflow-y-auto min-h-0 pb-20">

        {/* ================= Categories ================= */}
        <Section>

          <div className="flex items-center gap-2 mb-2">

            <h3 className="font-semibold">
              {t("categories")}
            </h3>

            {/* ADD */}
            <button
              onClick={() => {

                setEditData(null);

                setDepartmentName("");

                setDepartmentLogo(null);

                setShowModal(true);
              }}
              className="border border-[#2DDBC9] text-[#00816F] px-3 py-1 rounded text-xs"
            >
              + إضافة جديد
            </button>
          </div>

          {/* LIST */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">

            {categories.map((cat) => (

              <div
                key={cat.id}
                className="bg-white rounded px-3 py-2 flex justify-between items-center shadow-sm transition"
              >

                <div className="flex items-center gap-2">

                  {cat.logo && (

                    <img
                      src={cat.logo}
                      alt={cat.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}

                  <span>
                    {cat.name}
                  </span>
                </div>

                <div className="flex gap-3 text-xs text-[#00816F]">

                  {/* UPDATE */}
                  <button
                    onClick={() => {

                      setEditData(cat);

                      setDepartmentName(
                        cat.name
                      );

                      setDepartmentLogo(null);

                      setShowModal(true);
                    }}
                  >
                    update
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(cat.id)
                    }
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ================= MODAL ================= */}
        {showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BLUR */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* MODAL */}
            <div className="relative bg-white rounded-2xl w-[420px] p-6 shadow-2xl">

              {/* TITLE */}
              <h2 className="text-xl font-bold mb-5 text-center">

                {editData
                  ? "Update Department"
                  : "Add Department"}
              </h2>

              {/* NAME */}
              <div className="mb-4">

                <label className="block text-sm mb-1 font-medium">
                  Name *
                </label>

                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) =>
                    setDepartmentName(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:border-[#2DDBC9]"
                  placeholder="Department Name"
                />
              </div>

              {/* LOGO */}
              <div className="mb-6">

                <label className="block text-sm mb-1 font-medium">
                  Logo
                </label>

                <input
                  type="file"
                  onChange={(e) =>
                    setDepartmentLogo(
                      e.target.files[0]
                    )
                  }
                  className="w-full border rounded-xl px-3 py-2"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4">

                {/* CANCEL */}
                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-6 py-2 rounded-xl border"
                >
                  Cancel
                </button>

                {/* SAVE */}
                <button
                  onClick={
                    handleSaveDepartment
                  }
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= Priorities ================= */}
        <Section title={t("editPriorities")}>

          <DndContext
            collisionDetection={
              closestCenter
            }
            onDragEnd={(e) => {

              const {
                active,
                over,
              } = e;

              if (
                over &&
                active.id !== over.id
              ) {

                setPriorities((items) =>
                  arrayMove(
                    items,
                    items.indexOf(
                      active.id
                    ),
                    items.indexOf(
                      over.id
                    )
                  )
                );
              }
            }}
          >

            <SortableContext
              items={priorities}
              strategy={
                verticalListSortingStrategy
              }
            >

              <div className="space-y-1.5">

                {priorities.map((p) => (

                  <SortableItem
                    key={p}
                    id={p}
                    label={p}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Section>

        {/* ================= SLA ================= */}
        <Section title={t("sla")}>

          {Object.keys(sla).map((key) => (

            <div
              key={key}
              className="bg-white px-3 py-1.5 rounded shadow-sm flex justify-between items-center"
            >

              <span>
                {key}
              </span>

              <div className="flex gap-3">

                <TimeInput
                  value={
                    sla[key].hours
                  }
                  unit={t("hour")}
                  onChange={(v) =>
                    setSla({
                      ...sla,
                      [key]: {
                        ...sla[key],
                        hours: v,
                      },
                    })
                  }
                />

                <TimeInput
                  value={
                    sla[key].days
                  }
                  unit={t("day")}
                  onChange={(v) =>
                    setSla({
                      ...sla,
                      [key]: {
                        ...sla[key],
                        days: v,
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </Section>

        {/* ================= Overtime ================= */}
        <Section title={t("overtime")}>

          <Toggle
            label={t("redAlert")}
            active={overtime.alert}
            onClick={() =>
              setOvertime((p) => ({
                ...p,
                alert:
                  !p.alert,
              }))
            }
          />

          <Toggle
            label={t("reassignTask")}
            active={
              overtime.reassign
            }
            onClick={() =>
              setOvertime((p) => ({
                ...p,
                reassign:
                  !p.reassign,
              }))
            }
          />
        </Section>

        {/* ================= AI ================= */}
        <Section title={t("aiSettings")}>

          <div className="flex items-center gap-6">

            <input
              type="range"
              min={0}
              max={100}
              value={ai}
              onChange={(e) =>
                setAi(
                  +e.target.value
                )
              }
              style={getSliderBg(ai)}
              className="w-[420px] h-1.5 rounded-full"
            />

            <div className="px-3 py-1 border rounded-xl text-sm font-semibold text-[#00816F]">

              {ai}%
            </div>
          </div>
        </Section>

        {/* ================= Notifications ================= */}
        <Section
          title={t(
            "notificationSettings"
          )}
        >

          <div className="grid grid-cols-2 gap-y-3 gap-x-10">

            <Toggle
              label="SMS"
              active={
                notifications.sms
              }
              onClick={() =>
                setNotifications((p) => ({
                  ...p,
                  sms:
                    !p.sms,
                }))
              }
            />

            <Toggle
              label={t("email")}
              active={
                notifications.email
              }
              onClick={() =>
                setNotifications((p) => ({
                  ...p,
                  email:
                    !p.email,
                }))
              }
            />

            <Toggle
              label={t(
                "simpleUpdate"
              )}
              active={
                notifications.update
              }
              onClick={() =>
                setNotifications((p) => ({
                  ...p,
                  update:
                    !p.update,
                }))
              }
            />

            <Toggle
              label={t(
                "assignNotify"
              )}
              active={
                notifications.assign
              }
              onClick={() =>
                setNotifications((p) => ({
                  ...p,
                  assign:
                    !p.assign,
                }))
              }
            />
          </div>
        </Section>

        {/* SAVE */}
        <div className="flex justify-center gap-4 mt-6 mb-2">

          <button className="border px-10 py-1 rounded">
            {t("edit")}
          </button>

          <button className="bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white px-10 py-1 rounded">
            {t("add")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({
  title,
  children,
}) {

  return (

    <div className="mb-3">

      {title && (

        <h3 className="font-semibold mb-1">
          {title}
        </h3>
      )}

      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function TimeInput({
  value,
  onChange,
  unit,
}) {

  return (

    <div className="flex items-center border rounded px-2 py-0.5 gap-1">

      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(
            +e.target.value
          )
        }
        className="w-8 text-center outline-none text-xs"
      />

      <span className="text-[10px]">
        {unit}
      </span>
    </div>
  );
}

function Toggle({
  label,
  active,
  onClick,
}) {

  return (

    <div className="flex items-center gap-4">

      <span className="text-sm">
        {label}
      </span>

      <div
        onClick={onClick}
        className={`w-9 h-4 rounded-full cursor-pointer relative ${
          active
            ? "bg-gradient-to-r from-[#00816F] to-[#2DDBC9]"
            : "bg-gray-300"
        }`}
      >

        <div
          className={`absolute top-0.5 w-3 h-3 bg-white rounded-full ${
            active
              ? "right-0.5"
              : "left-0.5"
          }`}
        />
      </div>
    </div>
  );
}

function SortableItem({
  id,
  label,
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {

    transform:
      CSS.Transform.toString(
        transform
      ),

    transition,
  };

  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white px-3 py-1.5 rounded shadow-sm cursor-grab"
    >
      ≡ {label}
    </div>
  );
}