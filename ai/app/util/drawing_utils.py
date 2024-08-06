import cv2


def draw_rounded_rectangle(image, rect_start, rect_end, corner_width, box_color):
    x1, y1 = rect_start
    x2, y2 = rect_end
    w = corner_width

    cv2.rectangle(image, (x1 + w, y1), (x2 - w, y1 + w), box_color, -1)
    cv2.rectangle(image, (x1 + w, y2 - w), (x2 - w, y2), box_color, -1)
    cv2.rectangle(image, (x1, y1 + w), (x1 + w, y2 - w), box_color, -1)
    cv2.rectangle(image, (x2 - w, y1 + w), (x2, y2 - w), box_color, -1)
    cv2.rectangle(image, (x1 + w, y1 + w), (x2 - w, y2 - w), box_color, -1)

    cv2.ellipse(image, (x1 + w, y1 + w), (w, w),
                angle=0, startAngle=-90, endAngle=-180, color=box_color, thickness=-1)

    cv2.ellipse(image, (x2 - w, y1 + w), (w, w),
                angle=0, startAngle=0, endAngle=-90, color=box_color, thickness=-1)

    cv2.ellipse(image, (x1 + w, y2 - w), (w, w),
                angle=0, startAngle=90, endAngle=180, color=box_color, thickness=-1)

    cv2.ellipse(image, (x2 - w, y2 - w), (w, w),
                angle=0, startAngle=0, endAngle=90, color=box_color, thickness=-1)

    return image


def draw_dotted_line(frame, lm_coord, start, end, line_color):
    pix_step = 0

    for i in range(start, end + 1, 8):
        cv2.circle(frame, (lm_coord[0], i + pix_step), 2, line_color, -1, lineType=cv2.LINE_AA)

    return frame


def draw_text(
        image,
        message,
        width=8,
        font=cv2.FONT_HERSHEY_SIMPLEX,
        pos=(0, 0),
        font_scale=1,
        font_thickness=2,
        text_color=(0, 255, 0),
        text_color_background=(0, 0, 0),
        box_offset=(20, 10)
):
    offset = box_offset
    x, y = pos
    text_size, _ = cv2.getTextSize(message, font, font_scale, font_thickness)
    text_w, text_h = text_size
    rect_start = tuple(p - 0 for p, o in zip(pos, offset))
    rect_end = tuple(m + n - o for m, n, o in zip((x + text_w, y + text_h), offset, (25, 0)))

    image = draw_rounded_rectangle(image, rect_start, rect_end, width, text_color_background)

    cv2.putText(
        image,
        message,
        (int(rect_start[0] + 6), int(y + text_h + font_scale - 1)),
        font,
        font_scale,
        text_color,
        font_thickness,
        cv2.LINE_AA
    )

    return text_size
