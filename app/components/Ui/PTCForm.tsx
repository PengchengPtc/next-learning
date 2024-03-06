import React, { useEffect, useState } from "react";
type FormValues = {
  [K: string]: any;
};
export const useForm = () => {
  const [values, setValues] = useState<FormValues>({});

  return {
    values,
    getValue: (name: string) => values[name] || "",
    setValue: (name: string, value: string) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    reset: () => setValues({}),
  };
};
interface PTCFormProps {
  form: any;
  children: React.ReactNode;
}

export const PTCForm = (props: PTCFormProps) => {
  const { form, children } = props;
  const [inputNames, setInputNames] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const newInputNames: any = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const { name, initValue } = child?.props;
        if (name) {
          newInputNames.push(name);
        }
        // 设置默认值，todo
        // if (
        //   name &&
        //   initValue !== undefined &&
        //   initValue !== form.values[name]
        // ) {
        //   form.setValue(name, initValue);
        // }
      }
    });

    setInputNames(newInputNames);
  }, [children]);

  useEffect(() => {
    if (!hasInitialized && inputNames.length > 0) {
      inputNames.forEach((name) => {
        if (!form.values[name]) {
          form.setValue(name, "");
        }
      });
      setHasInitialized(true);
    }
  }, [form, hasInitialized, inputNames]);

  const handleChange = (e: any) => {
    form.setValue(e.target.name, e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(JSON.stringify(form.values, null, 2));
    form.reset();
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        value: form.values[child.props.name] || "",
        onChange: handleChange,
      });
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {childrenWithProps}
      <input
        type="submit"
        value="确定"
        className="px-3 py-2 bg-blue-500 text-white cursor-pointer rounded"
      />
    </form>
  );
};
