import { describe, assert, expect, it, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { obtenerError } from 'src/components/utils/obtenerError.jsx'
import { checkSubpods } from 'src/components/utils/wolframeUtils.jsx'


describe('obtenerError', () => {
    test('si le doy un input que no contenga ≈, devuelve vacio', () => {
        expect(obtenerError("nada", 0)).toBe("")
    })
    test('al hacer 740/9 ≈ 82.2222222, devuelve 0.0006', () => {
        expect(obtenerError("740/9 ≈ 82.2222222", 82.2227)).toBe("0.0006%")
    })
})




describe('checkSubpods', () => {
    test('si le doy un array vacio, devuelve nada', () => {
        const result = checkSubpods("nada", [])
        expect(result).toBe(null)
    })

    // @vitest-environment happy-dom
    // test("renders subpods correctly", () => {
    //     const name = "Subpods";
    //     const subpod_array = [
    //       { src: "image1.jpg", alt: "image1" },
    //       { src: "image2.jpg", alt: "image2" },
    //       { src: "image3.jpg", alt: "image3" },
    //     ];
    //     const { getByText, getAllByRole } = render(
    //       <checkSubpods name={name} subpod_array={subpod_array} />
    //     );
      
    //     // expect(getByText(name)).toBeInTheDocument();
      
    //     const images = getAllByRole("img");
    //     expect(images).toHaveLength(subpod_array.length);
    //     images.forEach((image, index) => {
    //       expect(image).toHaveAttribute("src", subpod_array[index].src);
    //       expect(image).toHaveAttribute("alt", subpod_array[index].alt);
    //     });
    //   });
})